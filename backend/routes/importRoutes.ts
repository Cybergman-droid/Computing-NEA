import { Database } from "better-sqlite3";
import { Router } from "express";
import multer from "multer";

const uploads = multer();

export default function createImportRoutes(db: Database) {
	const importRouter = Router();

	// POST route to recieve the CSV file sent to the database using the multer middleware
	importRouter.post("/", uploads.single("bankCsvFile"), (request, response) => {
		if (!request.file) {
			return response.status(400).json({
				message: "Please upload a CSV file.",
			});
		}

		console.log("Original name:", request.file?.originalname);
		console.log("MIME type:", request.file?.mimetype);
		console.log("Size:", request.file?.size);

		// If there are no errors the transaction is inserted into the database
		const importLogInsertStatement = `
                INSERT INTO import_log
                (date,filename,imported,skipped,bank)
                VALUES (?, ?, ?, ?, ?)
            `;
		const result = db
			.prepare(importLogInsertStatement)
			.run("2025-09-5", "monzo-may-2025.csv", 47, 3, "Monzo");
		response.status(201).json({
			message: "File uploaded successfully.",
			filename: request.file.originalname,
		});
		console.log(result);
	});

	// GET route to send the import log data to the frontend
	importRouter.get("/", (request, response) => {
		console.log(request);
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
