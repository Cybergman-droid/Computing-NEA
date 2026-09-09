import { Express } from "express";
import express from "express";
import initDb from "./db";
import cors from "cors";
import createTransactionRoutes from "./routes/transactionRoutes";
import createBudgetsRoutes from "./routes/budgetsRoutes";
import createImportRoutes from "./routes/importRoutes";
import createStatsRoutes from "./routes/statsRoutes";

// Initlialises the express app
const app: Express = express();
const PORT = process.env.PORT || 3000;

// Initlialise the database before the server starts
const db = initDb();

// Allows the frontend to make http requests to the backend
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
		credentials: true,
	}),
);

// Middleware to parse json from the request
app.use(express.json());

// Allows the server to access the various endpoints to send or request data from
// And passes in the database connection so that the routes can use the database
app.use("/api/transactions", createTransactionRoutes(db));
app.use("/api/budgets", createBudgetsRoutes(db));
app.use("/api/import", createImportRoutes(db));
app.use("/api/stats", createStatsRoutes(db));

// Allows the app to listen for requests on port 3000
app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
