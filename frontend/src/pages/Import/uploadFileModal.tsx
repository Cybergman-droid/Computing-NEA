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
					<div className='flex items-center justify-center'>
						<span className='loading loading-ring loading-xl'></span>
					</div>
				)}
				{status === "success" && (
					<div
						role='alert'
						className='alert alert-success flex items-center justify-center'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 shrink-0 stroke-current'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<span>File uploaded successfully</span>
					</div>
				)}
				{status === "error" && (
					<div
						role='alert'
						className='alert alert-error flex items-center justify-center'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 shrink-0 stroke-current'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<span>File upload failed</span>
					</div>
				)}
			</div>
		</dialog>
	);
}

export default FileUploadResultModal;
