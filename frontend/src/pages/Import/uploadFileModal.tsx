import { useEffect, useRef } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

function FileUploadResultModal({
	status,
	onClose,
}: {
	status: UploadStatus;
	onClose: () => void;
}) {
	const fileUploadModal = useRef<HTMLDialogElement>(null);

	// Runs anytime the status changes and decides if the modal should be opened or closed
	useEffect(() => {
		const modal = fileUploadModal.current;

		if (status === "idle") {
			if (modal?.open) {
				modal.close();
			}
		} else if (!modal?.open) {
			modal?.showModal();
		}
	}, [status]);

	return (
		<dialog ref={fileUploadModal} className='modal' onClose={onClose}>
			<div className='modal-box'>
				{/* Hides the close button when the status is not uploaading so that the user can't close ths modal */}
				{status !== "uploading" && (
					<form method='dialog'>
						<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
							✕
						</button>
					</form>
				)}

				{/* Renders the appropriate statement depending on the status*/}
				{status === "uploading" && (
					<span className='loading loading-ring loading-xl'></span>
				)}
				{status === "success" && (
					<div role='alert' className='alert alert-success'>
						<span>File uploaded successfully</span>
					</div>
				)}
				{status === "error" && (
					<div role='alert' className='alert alert-error'>
						<span>File upload failed</span>
					</div>
				)}
			</div>
		</dialog>
	);
}

export default FileUploadResultModal;
