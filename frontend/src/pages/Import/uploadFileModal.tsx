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

	useEffect(() => {
		const modal = fileUploadModal.current;

		if (status === "success" || status === "error") {
			modal?.showModal();
		}

		return () => modal?.close();
	}, [status]);

	if (status === "uploading") {
		return <span className='loading loading-ring loading-xl'></span>;
	}

	if (status !== "success" && status !== "error") {
		return null;
	}

	const isSuccess = status === "success";

	return (
		<dialog ref={fileUploadModal} className='modal' onClose={onClose}>
			<div className='modal-box'>
				<form method='dialog'>
					<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
						✕
					</button>
				</form>
				<div
					role='alert'
					className={`alert ${isSuccess ? "alert-success" : "alert-error"}`}
				>
					<span>
						{isSuccess ? "File uploaded successfully" : "File upload failed"}
					</span>
				</div>
			</div>
		</dialog>
	);
}

export default FileUploadResultModal;
