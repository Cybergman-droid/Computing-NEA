import { type Request, type Response, Router } from "express";
import { Transaction } from "../types/Transaction";
import { query } from "express-validator";

// Defines the endpoints for the transactions
const router = Router();

// Post route to send the transaction data to the backend
// TODO add validation and upload to the database
router.post("/", (request: Request, response: Response) => {
	const newTransaction: Transaction = request.body;
	console.log(newTransaction.description);
	return response.send(200);
});

export default router;
