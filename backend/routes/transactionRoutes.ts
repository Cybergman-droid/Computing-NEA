import { type Request, type Response, Router } from "express";
import { validationResult } from "express-validator";
import { singleTransactionValidator } from "../validators/singleTransactionValidationSc";
import { Database } from "better-sqlite3";

export type NewTransaction = {
	amount: number;
	category: string;
	description: string;
	date: string;
	confidence: 0;
	autoClassified: boolean;
};

// Creates the transaction endpoints that requests will be sent
// Includes a database connection to intractions with the database
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
				return response.status(400).json({ errors: errors.array() });
			}

			const newTransaction: NewTransaction = request.body;
			console.log(newTransaction);

			// If there are no errors the transaction is inserted into the database
			const transactionInsertStatement = `
                INSERT INTO transactions
                (amount, category, description, date, confidence, auto_classified)
                VALUES (?, ?, ?, ?, ?, ?)
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
				);
			response.status(201).json({ id: result.lastInsertRowid });
		},
	);
	return transactionRouter;
}
