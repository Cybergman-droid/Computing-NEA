import { useState } from "react";

import SingleTransactionUploadForm from "./singleTransactionUploadForm";
import TransactionFeedback from "../../components/form/formFeedback";

type UploadFormModalProps = {
	onClose: () => void;
};

// Modal which display the form and the feedback message after
function UploadFormModal({ onClose }: UploadFormModalProps) {
	const [showForm, setShowForm] = useState(true);
	const [transactionResponse, setTransactionResponse] = useState<unknown>(null);

	// Resets the modal when the form is closed
	const resetUploadForm = () => {
		(
			document.getElementById("transactionForm") as HTMLFormElement | null
		)?.reset();
		onClose();
	};

	//  Callback function that is passed into the form
	// Updates the states that track response from the backend (which allows the response to be passed into the feedback component) and whether to show the form
	const handleApiResponse = (response: Response | unknown) => {
		console.log(`Response recieved from transaction form:`);
		console.log(response);
		setShowForm(false);
		setTransactionResponse(response);
	};

	return (
		<dialog
			id='uploadFormModal'
			className='modal'
			open
			onClose={resetUploadForm}
		>
			<div className=' flex flex-col modal-box h-auto max-w-15/10'>
				<form method='dialog'>
					{/* if there is a button in form, it will close the modal */}
					<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
						✕
					</button>
				</form>

				{showForm ? (
					<SingleTransactionUploadForm onTransactionPost={handleApiResponse} />
				) : (
					<TransactionFeedback response={transactionResponse} />
				)}
			</div>
		</dialog>
	);
}

export default UploadFormModal;
