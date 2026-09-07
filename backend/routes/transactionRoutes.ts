import { type Request, type Response, Router } from "express";
import { Transaction } from "../types/Transaction";
import { query } from "express-validator";
import { Database } from "better-sqlite3";

export type NewTransaction = {
	amount: number;
	category: string;
	description: string;
	date: Date;
	confidence: null;
	autoClassified: boolean;
};

export default function createTransactionRoutes(db: Database) {
	// Defines the endpoints for the transactions
	const router = Router();

	// Post route to send the transaction data to the backend
	// TODO add validation and upload to the database
	router.post("/", (request: Request, response: Response) => {
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
				newTransaction.date,
				newTransaction.confidence,
				newTransaction.autoClassified ? 1 : 0,
			);
		response.status(201).json({ id: result.lastInsertRowid });
	});
	return router;
}
