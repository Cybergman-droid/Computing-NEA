import {
	BarclaysTransaction,
	NormalizedTransaction,
} from "../types/Transaction";

function amountParser(credit: number | null, debit: number | null): number {
	if (credit === null && debit === null) {
		throw new Error("Either credit or debit is required");
	}

	if (credit !== null && debit !== null) {
		throw new Error("Credit and debit cannot both be provided");
	}

	if (credit !== null) {
		return credit < 0 ? -credit : credit;
	}

	return debit! > 0 ? -debit! : debit!;
}

// Validates and parses the barclays data into a normalized format for use in other parts of the app
export default function barclaysParser(
	parsedCsvArray: BarclaysTransaction[],
): [NormalizedTransaction[], number, string] {
	let normalizedTransactions: NormalizedTransaction[] = [];
	let numRowsSkipped = 0;
	for (let transaction of parsedCsvArray) {
		let date = transaction["Transaction Date"];
		let description = transaction.Narrative;
		let debit = transaction.Debit;
		let credit = transaction.Credit;
		let isoDate;

		// Validates the date and converts into a date object
		try {
			const [day, month, year] = date.split("/").map(Number);
			isoDate = new Date(Date.UTC(year, month - 1, day)).toISOString();
		} catch (error) {
			numRowsSkipped += 1;
			continue;
		}

		if (!description) {
			numRowsSkipped += 1;
			continue;
		}

		// Checks that only one of credit or debit is a number with the other being null
		if (
			(debit === null && credit === null) ||
			(credit !== null && debit !== null) ||
			(debit !== null && !Number.isFinite(debit)) ||
			(credit !== null && !Number.isFinite(credit))
		) {
			numRowsSkipped += 1;
			continue;
		}

		let normalizedTransaction: NormalizedTransaction = {
			description: description,
			bank: "Barclays",
			amount: amountParser(credit, debit),
			date: isoDate.split("T")[0],
		};

		normalizedTransactions.push(normalizedTransaction);
	}

	const dateOfImport = new Date().toISOString();

	return [normalizedTransactions, numRowsSkipped, dateOfImport];
}
