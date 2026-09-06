export interface Transaction {
	name: string;
	description?: string;
	category: string;
	amount: number;
	transactionType: string;
	bankName: string;
	date: string;
}
