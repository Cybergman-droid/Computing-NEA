import { type Request, type Response, Router } from "express";
import { Transaction } from "../types/Transaction";
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

export default function createTransactionRoutes(db: Database) {
	// Defines the endpoints for the transactions
	const router = Router();

	// Post route to send the transaction data to the backend
	router.post(
		"/",
		singleTransactionValidator,
		(request: Request, response: Response) => {
			const errors = validationResult(request);

			if (!errors.isEmpty()) {
				console.log(errors.array());
				return response.status(400).json({ errors: errors.array() });
			}

			const newTransaction: NewTransaction = request.body;
			console.log(newTransaction);

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
	return router;
}
