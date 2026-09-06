export interface Transaction {
	id?: number;
	amount: number;
	category: string;
	description: string;
	date: string;
	confidence?: number;
	autoClassified: boolean; // your code uses boolean
}
