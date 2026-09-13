export interface Transaction {
	id?: number;
	amount: number;
	category: string;
	description: string;
	date: string;
	confidence: number | null;
	autoClassified: boolean;
}

export type BarclaysTransaction = {
	"Transaction Date": string;
	Narrative: string;
	Debit: number | null;
	Credit: number | null;
	Balance: number;
};
export type ClassifiedTransaction = {
	date: string;
	description: string;
	category: string | null;
	amount: number;
	confidence: number | null;
	autoClassified: boolean;
	bank: string;
};
export type NormalizedTransaction = {
	date: string;
	description: string;
	amount: number;
	bank: string;
};
