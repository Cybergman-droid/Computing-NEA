import { Database } from "better-sqlite3";
import { Router } from "express";

export default function createImportRoutes(db: Database) {
	const importRouter = Router();
	return importRouter;
}
