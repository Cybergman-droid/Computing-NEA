import TextInputField from "../../components/form/inputFieldText.tsx";
import NumberInputField from "../../components/form/inputFieldNumber.tsx";
import DropdownMenu from "../../components/form/dropdown.tsx";
import SubmitButton from "../../components/form/submitButton.tsx";
import DateInputField from "../../components/form/inputFieldDate.tsx";

const transactionTypeOptions = ["Deposit", "Withdrawal"];
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

function SingleTransactionUploadForm() {
	return (
		<form>
			<p className='justify-self-center text-3xl font-bold mb-15'>
				Enter the information for a single transaction
			</p>
			<div className='flex flex-col gap-6'>
				<TextInputField placeholder='Transaction Name' name='transactionName' />
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
					<NumberInputField placeholder='Amount' name='transactionAmount' />
				</div>
				<div className='flex justify-between gap-6'>
					<DropdownMenu
						defaultValue={"Categories"}
						dropdownOptions={categoryDropdownOptions}
						name='transactionCategory'
					/>
					<DateInputField name='transactionDate' />
				</div>
				<SubmitButton name='transactionSubmit' />
			</div>
		</form>
	);
}

export default SingleTransactionUploadForm;
