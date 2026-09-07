import { Database } from "better-sqlite3";
import { Router } from "express";

export default function createStatsRoutes(db: Database) {
	const statsRouter = Router();
	return statsRouter;
}
