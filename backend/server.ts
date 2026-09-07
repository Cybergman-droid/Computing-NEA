import { Express } from "express";
import express from "express";
import initDb from "./db";
import createTransactionRoutes from "./routes/transactionRoutes";
import cors from "cors";

const app: Express = express();
const PORT = process.env.PORT || 3000;

// initlialise the database before the server starts
const db = initDb();

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	}),
);

// middleware to parse json from the request
app.use(express.json());
// allows the server to access the various endpoints to send or request data from
app.use("/api/transactions", createTransactionRoutes(db));

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
