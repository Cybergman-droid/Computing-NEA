import TextInputField from "../../components/form/inputFieldText.tsx";
import NumberInputField from "../../components/form/inputFieldNumber.tsx";
import DropdownMenu from "../../components/form/dropdown.tsx";
import SubmitButton from "../../components/form/submitButton.tsx";

function SingleTransactionUploadForm() {
	return (
		<>
			<p className='justify-self-center text-3xl font-bold mb-15'>
				Enter the information for a single transaction
			</p>

			<div className='flex flex-col gap-6'>
				<TextInputField placeholderString='Transaction Name' />
				<TextInputField
					placeholderString='Transaction Description (optional)'
					variant='transactionDescription'
				/>
				<div className='flex justify-between gap-6'>
					<DropdownMenu
						defaultOption='Deposit or Withdrawal'
						dropdownOptions={["Deposit", "Withdrawal"]}
					/>
					<NumberInputField placeholderString='Amount' />
				</div>
				<SubmitButton />
			</div>
		</>
	);
}

export default SingleTransactionUploadForm;
