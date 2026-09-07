import { Database } from "better-sqlite3";
import { Router } from "express";

export default function createBudgetsRoutes(db: Database) {
	const budgetRouter = Router();
	return budgetRouter;
}
