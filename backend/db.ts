import Database from "better-sqlite3";

// Creates a new database object
const db = new Database("fintrack.db", { verbose: console.log });

const transactionTableInitStatement = `
    CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    transactionType TEXT NOT NULL,
    bankName TEXT NOT NULL,
    date TEXT NOT NULL
    );
`;

// An array of objects that links the corect table to its init statement
const tableInitStatements: Record<string, string>[] = [
	{ transactionTable: transactionTableInitStatement },
];

// Creates the tables in the database
function createTables(tableInitStatements: Record<string, string>[]) {
	for (let table of tableInitStatements) {
		db.exec(table.transactionTable);
	}
}

createTables(tableInitStatements);

// Exports the database object for use in other parts of the app
export default db;
