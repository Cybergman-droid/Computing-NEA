import { useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadResultModal from "./uploadFileFeedbackModal";

type UploadStatus = "idle" | "uploading" | "success" | "error";
type FileUploadAreaProps = {
	onFileUpload?: (response: Response) => void;
};

function FileUploadArea({ onFileUpload }: FileUploadAreaProps) {
	// Tracks the status of the upload
	const [status, setStatus] = useState<UploadStatus>("idle");

	// Used react-dropzone to simplify the implemetation of the file upload zone
	const { getRootProps, getInputProps, isDragAccept, isDragReject } =
		useDropzone({
			accept: {
				"text/csv": [".csv"],
				"application/vnd.ms-excel": [".csv"],
				"application/octet-stream": [".csv"],
			}, // Defines the only files that can be accepted
			// Function that runs when a file is dropped into the zone
			async onDrop(acceptedFiles, fileRejections) {
				console.log(acceptedFiles[0]);
				console.log(fileRejections[0]);
				if (acceptedFiles.length === 0) {
					setStatus("error");
					return;
				}
				await handleFileUpload(acceptedFiles);
			},
		});

	const dropZoneStyles = `group flex min-h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:ring-offset-2 focus:ring-offset-slate-950 ${
		isDragAccept
			? "border-emerald-300 bg-emerald-950/70 text-emerald-50 shadow-emerald-950/40"
			: isDragReject
				? "border-rose-300 bg-rose-950/70 text-rose-50 shadow-rose-950/40"
				: "border-slate-600 bg-slate-900 text-slate-300 hover:border-cyan-400/70 hover:bg-slate-800"
	}`;

	// Handle uploading the file to the backend
	async function handleFileUpload(file: File[]) {
		if (file.length === 0) {
			setStatus("error");
			return;
		}

		setStatus("uploading");
		const formData = new FormData();
		formData.append("bankCsvFile", file[0]);

		// Tries to send the file and catches any errors that may be thrown
		try {
			const response = await fetch("/api/import", {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
				let message = `Upload failed with status ${response.status}`;
				try {
					const errorBody = (await response.json()) as { message?: string };
					if (errorBody.message) message = errorBody.message;
				} catch {
					// Keep the status-based message when the server returns non-JSON.
				}
				throw new Error(message);
			}
			onFileUpload?.(response);
			setStatus("success");
		} catch (error) {
			console.error(error);
			setStatus("error");
		}
	}
	return (
		<>
			<div {...getRootProps()} className={dropZoneStyles}>
				<input {...getInputProps()} />
				{/* Conditionally render a message depending on whether the file to be uploaded is valid or not */}
				{isDragAccept && <p>✅ Drop to upload these files</p>}
				{isDragReject && <p>❌ Some files will be rejected</p>}

				<p>Drag and drop your CSV file here.</p>
				<p>Or click to browse.</p>
			</div>
			{/* Rendered when the upload id complete to give feedback to the user */}
			<FileUploadResultModal
				status={status}
				onClose={() => setStatus("idle")}
			/>
		</>
	);
}

export default FileUploadArea;
