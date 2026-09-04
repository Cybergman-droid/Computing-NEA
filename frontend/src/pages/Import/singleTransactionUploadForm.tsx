import TextInputField from "../../components/form/inputFieldText.tsx";
import NumberInputField from "../../components/form/inputFieldNumber.tsx";
import DropdownMenu from "../../components/form/dropdown.tsx";
import SubmitButton from "../../components/form/submitButton.tsx";
import DateInputField from "../../components/form/inputFieldDate.tsx";
import type { FormEvent } from "react";

type Transaction = {
	transactionName: string;
	transactionDescription: string;
	transactionType: "Deposit" | "Withdrawal";
	transactionAmount: number;
	transactionCategory: string;
	transactionDate: Date;
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

function transactionFormValidation(
	payload: Record<string, FormDataEntryValue>,
): Transaction {
	const transactionName = String(payload.transactionName).trim();
	const transactionDescription = String(
		payload.transactionDescription ?? "",
	).trim();
	const transactionType = String(payload.transactionType);
	const transactionCategory = String(payload.transactionCategory);
	const transactionAmount = Number(payload.transactionAmount);
	const transactionDate = new Date(String(payload.transactionDate));
	const currentYear = new Date().getFullYear();

	if (!transactionName) {
		throw new Error("Transaction name is required");
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
	console.log();
	if (
		Number.isNaN(transactionDate.getTime()) ||
		transactionDate.getFullYear() > currentYear
	) {
		throw new Error("Invalid transaction date");
	}

	const transaction = {
		transactionName,
		transactionDescription,
		transactionType: transactionType as Transaction["transactionType"],
		transactionAmount,
		transactionCategory,
		transactionDate,
	};

	return transaction;
}

function handleSubmit(e: FormEvent<HTMLFormElement>) {
	e.preventDefault();

	const payload = Object.fromEntries(new FormData(e.currentTarget));

	try {
		const transaction: Transaction = transactionFormValidation(payload);
		console.log(transaction);
	} catch (error) {
		console.error(error);
		window.alert(error);
	}
}

function SingleTransactionUploadForm() {
	return (
		<>
			<p className='justify-self-center text-3xl font-bold mb-15'>
				Enter the information for a single transaction
			</p>

			<form id='transactionForm' onSubmit={handleSubmit}>
				<div className='flex flex-col gap-6'>
					<TextInputField
						placeholder='Transaction Name'
						name='transactionName'
						required={true}
					/>
					<TextInputField
						placeholder='Transaction Description (optional)'
						variant='transactionDescription'
						name='transactionDescription'
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
