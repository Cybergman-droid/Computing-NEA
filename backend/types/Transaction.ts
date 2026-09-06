export interface Transaction {
	name: string;
	description?: string;
	category: string;
	amount: number;
	date: string;
	confidence: number;
	autoClassified: boolean;
}
