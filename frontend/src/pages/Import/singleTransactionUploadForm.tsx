import TextInputField from "../../components/form/inputFieldText.tsx";
import NumberInputField from "../../components/form/inputFieldNumber.tsx";
import DropdownMenu from "../../components/form/dropdown.tsx";
import SubmitButton from "../../components/form/submitButton.tsx";
import DateInputField from "../../components/form/inputFieldDate.tsx";
import type { FormEvent } from "react";

type ParsedTransaction = {
	amount: number;
	category: string;
	description: string;
	date: Date;
	confidence: 0;
	autoClassified: boolean;
};
type ValidatedTransaction = {
	amount: number;
	category: string;
	type: string;
	description: string;
	date: Date;
};
const categoryDropdownOptions = [
	"Groceries",
	"Transport",
	"Eating Out",
	"Shopping",
	"Entertainment",
	"Utilities",
	"Income",
	"Savings",
	"Subscriptions",
	"Miscellaneous",
];
const transactionTypeOptions = ["Deposit", "Withdrawal"];

/* Takes in a payload of the data inputed in the transaction form and validates it, 
Returns a valid transaction object if it passes */

function transactionFormValidation(
	payload: Record<string, FormDataEntryValue>,
): ValidatedTransaction {
	const transactionDescription = String(payload.transactionDescription).trim();
	const transactionType = String(payload.transactionType);
	const transactionCategory = String(payload.transactionCategory);
	const transactionAmount = Number(payload.transactionAmount);
	const transactionDate = new Date(String(payload.transactionDate));
	const currentYear = new Date().getFullYear();

	if (!transactionDescription) {
		throw new Error("Transaction description is required");
	}

	if (!transactionTypeOptions.includes(transactionType)) {
		throw new Error("Invalid transaction type");
	}

	if (!categoryDropdownOptions.includes(transactionCategory)) {
		throw new Error("Invalid transaction category");
	}

	if (!Number.isFinite(transactionAmount) || transactionAmount <= 0) {
		throw new Error("Amount must be a positive number");
	}

	// validates that the year inputted is not greater then the current year
	if (
		Number.isNaN(transactionDate.getTime()) ||
		transactionDate.getFullYear() > currentYear
	) {
		throw new Error("Invalid transaction date");
	}

	const transaction: ValidatedTransaction = {
		amount: transactionAmount,
		type: transactionType,
		category: transactionCategory,
		description: transactionDescription,
		date: transactionDate,
	};

	return transaction;
}

// parses the validated form data in to the format the backend expects
function transactionFormParser(
	validatedTransaction: ValidatedTransaction,
): ParsedTransaction {
	const parsedAmount =
		validatedTransaction.type === "Deposit"
			? validatedTransaction.amount
			: 0 - validatedTransaction.amount;

	const parsedTransation: ParsedTransaction = {
		amount: parsedAmount,
		category: validatedTransaction.category,
		description: validatedTransaction.description,
		date: validatedTransaction.date,
		autoClassified: false,
		confidence: 0,
	};

	return parsedTransation;
}

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
	e.preventDefault();
	const payload = Object.fromEntries(new FormData(e.currentTarget));
	console.log("payload");
	console.log(payload);

	try {
		//validates the transaction
		const validatedTransaction: ValidatedTransaction =
			transactionFormValidation(payload);
		console.log(`Validated transaction`);
		console.log(validatedTransaction);

		// parses the transaction into the format expacteed by the backend
		const parsedTransaction: ParsedTransaction =
			transactionFormParser(validatedTransaction);
		console.log(`Parsed transaction `);
		console.log(parsedTransaction);

		// sends a POST request to the backend containing the parsed transaction object
		await fetch("http://localhost:3000/api/transactions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			mode: "cors",
			body: JSON.stringify(parsedTransaction),
		});
		// catchs any errors that the validator throws
	} catch (error) {
		console.error(error);
		window.alert(error);
	}
}

function SingleTransactionUploadForm() {
	return (
		<>
			<p className='justify-self-center text-3xl font-bold mb-5'>
				Enter the information for a single transaction
			</p>

			<form id='transactionForm' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-6'>
					<TextInputField
						placeholder='Transaction Description'
						variant='transactionDescription'
						name='transactionDescription'
						required={true}
					/>

					<div className='flex justify-between gap-6'>
						<DropdownMenu
							defaultValue='Deposit or Withdrawal'
							dropdownOptions={transactionTypeOptions}
							name='transactionType'
						/>
						<NumberInputField
							placeholder='Amount'
							name='transactionAmount'
							required={true}
						/>
					</div>

					<div className='flex justify-between gap-6'>
						<DropdownMenu
							defaultValue={"Categories"}
							dropdownOptions={categoryDropdownOptions}
							name='transactionCategory'
						/>
						<DateInputField name='transactionDate' required={true} />
					</div>

					<SubmitButton name='transactionSubmit' />
				</div>
			</form>
		</>
	);
}

export default SingleTransactionUploadForm;
