import { Database } from "better-sqlite3";
import { Router } from "express";
import multer from "multer";
import Papa from "papaparse";
import barclaysParser from "../parsers/barclaysParser";
import {
	BarclaysTransaction,
	ClassifiedTransaction,
	NormalizedTransaction,
} from "../types/TransactionTypes";
import NaiveBayesClassifer from "../NaiveBayes";
import { seedTrainingData } from "../trainingData";

const uploads = multer({ storage: multer.memoryStorage() });

function classifyTransactions(
	transactions: NormalizedTransaction[],
): ClassifiedTransaction[] {
	return transactions.map((transaction) => ({
		...transaction,
		category: null,
		confidence: null,
		autoClassified: false,
	}));
}

export default function createImportRoutes(db: Database) {
	const importRouter = Router();
	const classifier = new NaiveBayesClassifer(db, seedTrainingData);
	classifier.train();
	classifier.getWordCountData();

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
		const parseResults = Papa.parse<BarclaysTransaction>(csvFileText, {
			header: true,
			skipEmptyLines: true,
			dynamicTyping: true,
		});

		// Returns early if there are any errors
		// if (parseResults.errors.length > 0) {
		// 	console.log(parseResults.data);
		// 	return response.status(400).json({
		// 		message: "The uploaded file is not a valid CSV.",
		// 	});
		// }

		const parsedCsv = parseResults.data;

		// Parses the transations into a normalized form
		const [normalizedTransactions, numRowsSkipped, dateOfImport] =
			barclaysParser(parsedCsv);
		const numRowsImported = normalizedTransactions.length;

		if (numRowsImported === 0) {
			return response.status(400).json({
				message:
					"No valid transactions were found. Check that this is a supported Barclays CSV.",
			});
		}

		// Iterates over every transaction, classifies it and inserts it into the database
		for (let normalizedTransaction of normalizedTransactions) {
			const categoryScore = classifier.classify(
				normalizedTransaction.description,
			);
			const classifiedTransaction: ClassifiedTransaction = {
				...normalizedTransaction,
				category: categoryScore.category,
				confidence: categoryScore.confidence,
				autoClassified: true,
			};
			// If there are no errors the transaction is inserted into the database
			const transactionInsertStatement = `
                INSERT INTO transactions
                (amount, category, description, date, confidence, auto_classified,bank)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
			const result = db
				.prepare(transactionInsertStatement)
				.run(
					classifiedTransaction.amount,
					classifiedTransaction.category,
					classifiedTransaction.description,
					classifiedTransaction.date,
					classifiedTransaction.confidence,
					classifiedTransaction.autoClassified ? 1 : 0,
					"Barclays",
				);
		}

		console.log("Parsed Transactions:", normalizedTransactions);
		console.log("number of rows skipped", numRowsSkipped);
		console.log("number of rows imported", numRowsImported);

		// Inserts the import summary into the import_log table
		const importLogInsertStatement = `
                INSERT INTO import_log
                (date,filename,imported,skipped,bank)
                VALUES (?, ?, ?, ?, ?)`;
		const result = db
			.prepare(importLogInsertStatement)
			.run(
				dateOfImport.split("T")[0],
				file?.originalname,
				numRowsImported,
				numRowsSkipped,
				normalizedTransactions[0].bank,
			);

		response.status(201).json({
			message: "File uploaded successfully.",
			filename: file.originalname,
		});
		console.log(result);
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
