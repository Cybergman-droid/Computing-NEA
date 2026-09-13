import Database from "better-sqlite3";

const transactionTableInitStatement = `
    CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        date TEXT NOT NULL,
        confidence REAL NOT NULL,
        auto_classified BOOL NOT NULL,
        bank TEXT
    );
`;

// const normalizedTransactionsDateIndexInitStatement = `
//     CREATE INDEX IF NOT EXISTS idx_normalized_transactions_date
//     ON normalized_transactions_buffer (date);
// `;

const budgetsTableInitStatement = `
    CREATE TABLE IF NOT EXISTS budgets (
        category TEXT NOT NULL PRIMARY KEY,
        monthly_limit REAL NOT NULL
    );
`;

const wordCountsTableInitStatement = `
    CREATE TABLE IF NOT EXISTS word_counts (
        word TEXT NOT NULL,
        category TEXT NOT NULL,
        count INT NOT NULL,
        UNIQUE(word, category)
    );
`;

const importLogTableInitStatement = `
    CREATE TABLE IF NOT EXISTS import_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        filename TEXT NOT NULL,
        imported REAL NOT NULL,
        skipped REAL NOT NULL,
        bank TEXT
    );
`;

// An array of table init statements
const tableInitStatements: string[] = [
	transactionTableInitStatement,
	budgetsTableInitStatement,
	wordCountsTableInitStatement,
	importLogTableInitStatement,
];

// Creates the tables in the database
function createTables(tableInitStatements: string[], db: any) {
	for (let initStatement of tableInitStatements) {
		console.log("Running SQL:", initStatement);
		db.exec(initStatement);
	}
	console.log("Tables created");
}

// Creates a new database object and returns it so that it can be used by the server
function initDb() {
	console.log("db.ts is initialising");
	const db = new Database("fintrack.db", { verbose: console.log });
	createTables(tableInitStatements, db);
	return db;
}

export default initDb;
