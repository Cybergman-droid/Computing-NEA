import { Database } from "better-sqlite3";
import { Router } from "express";
import multer from "multer";
import Papa from "papaparse";

type BarclaysTransaction = {
	"Transaction Date": string;
	Narrative: string;
	Debit: number | null;
	Credit: number | null;
	Balance: number;
};
type ClassifiedTransaction = {
	date: string;
	description: string;
	category: string | null;
	amount: number;
	confidence: number | null;
	autoClassified: boolean;
	bank: string;
};
type NormalizedTransaction = {
	date: string;
	description: string;
	amount: number;
	bank: string;
};

const uploads = multer({ storage: multer.memoryStorage() });

function toIsoDate(dateText: string): string {
	const [day, month, year] = dateText.split("/").map(Number);

	return new Date(Date.UTC(year, month - 1, day)).toISOString();
}

// Validates and parses the barclays data into a normalized format for use in other parts of the app
function barclaysParser(
	parsedCsvArray: BarclaysTransaction[],
): [NormalizedTransaction[], number, string] {
	let normalizedTransactions: NormalizedTransaction[] = [];
	let numRowsSkipped = 0;
	for (let transaction of parsedCsvArray) {
		let date = transaction["Transaction Date"];
		let description = transaction.Narrative;
		let debit = transaction.Debit;
		let credit = transaction.Credit;

		if (!date) {
			numRowsSkipped += 1;
			continue;
		}
		if (!description) {
			numRowsSkipped += 1;
			continue;
		}
		if (
			(debit === null && credit === null) ||
			(debit !== null && !Number.isFinite(debit)) ||
			(credit !== null && !Number.isFinite(credit))
		) {
			numRowsSkipped += 1;
			continue;
		}

		const isoDate = toIsoDate(date);
		let normalizedTransaction: NormalizedTransaction = {
			description: description,
			bank: "Barclays",
			amount: debit !== null ? -debit : credit!,
			date: isoDate.split("T")[0],
		};

		normalizedTransactions.push(normalizedTransaction);
	}

	const dateOfImport = new Date().toISOString();

	return [normalizedTransactions, numRowsSkipped, dateOfImport];
}

export default function createImportRoutes(db: Database) {
	const importRouter = Router();

	// POST route to recieve the CSV file sent to the database using the multer middleware
	importRouter.post("/", uploads.single("bankCsvFile"), (request, response) => {
		const file = request.file;

		// Returns an error if the file does not exist
		if (!file) {
			return response.status(400).json({
				message: "Please upload a CSV file.",
			});
		}

		// Converts the CSV file into a string of text for parsing
		const csvFileText = file.buffer.toString("utf-8");

		// Parses the CSV file into an array of JSON bodies using Papa parse
		Papa.parse<BarclaysTransaction>(csvFileText, {
			header: true,
			skipEmptyLines: true,
			dynamicTyping: true,
			complete: (results) => {
				if (results.errors.length > 0) {
					return response.status(400).json({
						message: "The uploaded file is not a valid CSV.",
					});
				}

				const parsedCsv = results.data;

				const [parsedTransactions, numRowsSkipped, dateOfImport] =
					barclaysParser(parsedCsv);
				const numRowsImported = parsedTransactions.length;

				if (numRowsImported === 0) {
					return response.status(400).json({
						message:
							"No valid transactions were found. Check that this is a supported Barclays CSV.",
					});
				}

				console.log("Parsed Transactions:", parsedTransactions);
				console.log("number of rows skipped", numRowsSkipped);
				console.log("number of rows imported", numRowsImported);

				// If there are no errors the transaction summary is inserted into the database
				const importLogInsertStatement = `
                INSERT INTO import_log
                (date,filename,imported,skipped,bank)
                VALUES (?, ?, ?, ?, ?)
            `;
				const result = db
					.prepare(importLogInsertStatement)
					.run(
						dateOfImport.split("T")[0],
						file?.originalname,
						numRowsImported,
						numRowsSkipped,
						parsedTransactions[0].bank,
					);

				response.status(201).json({
					message: "File uploaded successfully.",
					filename: file.originalname,
				});
				console.log(result);
			},
			// TODO add the classifier class and function
		});
	});

	// GET route to send the import log data to the frontend
	importRouter.get("/", (request, response) => {
		try {
			// Select the most recent import log from the import_log table
			const importLogSelectStatement = `SELECT * FROM import_log ORDER BY id DESC LIMIT 1`;
			const importLog = db.prepare(importLogSelectStatement).all();

			// Sends the data to the frontend
			response.status(200).json(...importLog);
		} catch (error) {
			// Sends an error to the frontend if the data could not be fetched
			console.log(error);
			response.status(500).json({ message: "Failed to fetch import summary" });
		}
	});
	return importRouter;
}
