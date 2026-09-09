import { useEffect, useRef, useState } from "react";

import SingleTransactionUploadForm from "./singleTransactionUploadForm";
import TransactionFeedback from "../../components/form/formFeedback";

type UploadFormModalProps = {
	onClose: () => void;
};

function UploadFormModal({ onClose }: UploadFormModalProps) {
	const [showForm, setShowForm] = useState(true);
	const [transactionResponse, setTransactionResponse] = useState<unknown>(null);

	const uploadFormModal = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		uploadFormModal.current?.showModal();

		return () => uploadFormModal.current?.close();
	}, []);

	const resetUploadForm = () => {
		(
			document.getElementById("transactionForm") as HTMLFormElement | null
		)?.reset();
		onClose();
	};

	const handleApiResponse = (response: Response | unknown) => {
		console.log(`Response recieved from transaction form:`);
		console.log(response);
		setShowForm(false);
		setTransactionResponse(response);
	};

	return (
		<dialog
			ref={uploadFormModal}
			id='uploadFormModal'
			className='modal'
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
