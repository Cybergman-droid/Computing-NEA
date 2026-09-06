import { Express } from "express";
import express from "express";
import initDb from "./db";
import transactionRoutes from "./routes/transactionRoutes";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// middleware to parse json from the request
app.use(express.json());
// allows the server to access the transaction various endpoints
app.use("/api/transactions", transactionRoutes);
app.use("/api/import", transactionRoutes);
app.use("/api/budgets", transactionRoutes);
app.use("/api/stats", transactionRoutes);

// initlialise the database before the server starts
const db = initDb();

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
