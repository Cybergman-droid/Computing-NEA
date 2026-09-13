import { type Request, type Response, Router } from "express";
import { validationResult } from "express-validator";
import { singleTransactionValidator } from "../validators/singleTransactionValidationSc";
import { Database } from "better-sqlite3";
import { SingleTransaction } from "../types/Transaction";

// Creates the transaction endpoints that requests will be sent
// Includes a database connection to interactions with the database
export default function createTransactionRoutes(db: Database) {
	const transactionRouter = Router();

	// POST route to send the transaction data to the backend
	transactionRouter.post(
		"/",
		singleTransactionValidator, // Validates the data sent bafore it is inserted into the database
		(request: Request, response: Response) => {
			const errors = validationResult(request);

			//If the transaction doesnt match the schema the it is rejected
			if (!errors.isEmpty()) {
				console.log(errors.array());
				return response.status(400).json({
					errors: errors.array(),
					message:
						"Sorry Transaction was not able to be uploaded. Please try again.",
				});
			}

			const newTransaction: SingleTransaction = request.body;
			console.log(newTransaction);

			// If there are no errors the transaction is inserted into the database
			const transactionInsertStatement = `
                INSERT INTO transactions
                (amount, category, description, date, confidence, auto_classified,bank)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
			const result = db
				.prepare(transactionInsertStatement)
				.run(
					newTransaction.amount,
					newTransaction.category,
					newTransaction.description,
					newTransaction.date.split("T")[0],
					newTransaction.confidence,
					newTransaction.autoClassified ? 1 : 0,
					null,
				);
			response.status(201).json({
				id: result.lastInsertRowid,
				message: "Transaction was uploaded succesfully",
			});
		},
	);

	// GET route to send the transactions data to the frontend
	transactionRouter.get("/", (request: Request, response: Response) => {
		try {
			// Selects all the transactions from the database and sends the data to the frontend
			const transactionSelectAllStament = `SELECT * FROM transactions`;
			const transactions = db.prepare(transactionSelectAllStament).all();
			response.status(200).json(transactions);
		} catch (error) {
			// Sends an error to the frontend if the data could not be fetched from the database
			console.log(error);
			response.status(500).json({ message: "Failed to fetch transactions" });
		}
	});
	return transactionRouter;
}
