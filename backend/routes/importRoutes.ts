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

		return response.status(201).json({
			message: "File uploaded successfully.",
			filename: request.file.originalname,
		});
	});
	return importRouter;
}
