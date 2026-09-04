import { useEffect, useRef } from "react";

import SingleTransactionUploadForm from "./singleTransactionUploadForm";

type UploadFormModalProps = {
	onClose: () => void;
};

function UploadFormModal({ onClose }: UploadFormModalProps) {
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

				<SingleTransactionUploadForm />
			</div>
		</dialog>
	);
}

export default UploadFormModal;
