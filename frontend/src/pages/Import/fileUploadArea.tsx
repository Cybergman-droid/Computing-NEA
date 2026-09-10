import { useState } from "react";
import { useDropzone } from "react-dropzone";
type UploadStatus = "idle" | "uploading" | "success" | "error";

function FileUploadArea() {
	// Tracks the status of the file upload to give feedback to the user
	const [status, setStatus] = useState<UploadStatus>("idle");

	// Used react-dropzone to simplify the implemetation of the file upload zone
	const { getRootProps, getInputProps, isDragAccept, isDragReject } =
		useDropzone({
			accept: { "text/csv": [] }, // Defines the only files that can be accepted
			// Function that runs when a file is dropped into the zone
			onDrop(acceptedFiles, fileRejections, event) {
				console.log(acceptedFiles[0]);
				console.log(fileRejections[0]);
				console.log(event);
				handleFileUpload(acceptedFiles);
			},
		});

	const dropZoneStyles = `group flex min-h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:ring-offset-2 focus:ring-offset-slate-950 ${
		isDragAccept
			? "border-emerald-300 bg-emerald-950/70 text-emerald-50 shadow-emerald-950/40"
			: isDragReject
				? "border-rose-300 bg-rose-950/70 text-rose-50 shadow-rose-950/40"
				: "border-slate-600 bg-slate-900 text-slate-300 hover:border-cyan-400/70 hover:bg-slate-800"
	}`;

	// Will handle uploading the file to the backend
	function handleFileUpload(file: File[]) {
		if (!file) {
			setStatus("error");
			return;
		}

		setStatus("uploading");

		const formData = new FormData();
		formData.append("file", file[0]);

		try {
			// TODO await fetch request to send data to the backend
			setStatus("success");
		} catch (error) {
			// TODO add error handling
			setStatus("error");
		}
	}
	return (
		<div {...getRootProps()} className={dropZoneStyles}>
			<input {...getInputProps()} />
			{/* Conditionally render a message depending on whether the file to be uploaded is valid or not */}
			{isDragAccept && <p>✅ Drop to upload these files</p>}
			{isDragReject && <p>❌ Some files will be rejected</p>}

			<p>Drag and drop your CSV file here.</p>
			<p>Or click to browse.</p>
		</div>
	);
}

export default FileUploadArea;
