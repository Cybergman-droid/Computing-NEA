import { useState } from "react";
import UploadFormModal from "./uploadFormModal.tsx";
import FileUploadArea from "./fileUploadArea.tsx";
import ImportSummaryCard from "./importSummaryCard.tsx";

function ImportPage() {
	// Tracks whether the form should be rendered
	const [showFormModal, setShowFormModal] = useState(false);
	const [reImportSummary, setReImportSummary] = useState(false);

	// Callback function to trigger a rerender of the import sumarry card
	const handlePostResponse = (response: Response) => {
		console.log(`Response recieved from file upload:`);
		console.log(response);
		if (response.ok) setReImportSummary((current) => !current);
	};

	// All the content showed on the import page
	return (
		<div className='flex flex-col gap-10'>
			<FileUploadArea onFileUpload={handlePostResponse} />

			<button
				type='button'
				className='btn btn-outline btn-info'
				onClick={() => setShowFormModal(true)}
			>
				Upload a single Transaction
			</button>
			{/* Conditionally renders the form based in the showFormModal variable*/}
			{showFormModal && (
				<UploadFormModal onClose={() => setShowFormModal(false)} />
			)}

			<ImportSummaryCard reImportSummary={reImportSummary} />
		</div>
	);
}

export default ImportPage;
