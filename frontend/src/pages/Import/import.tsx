import { useState } from "react";
import UploadFormModal from "./uploadFormModal.tsx";
import SingleTransactionUploadFormButton from "./singleTranasctionFormButton.tsx";
import FileUploadArea from "./fileUploadArea.tsx";
import ImportSummaryCard from "./importSummaryCard.tsx";

function ImportPage() {
	// Tracks whether the form should be rendered
	const [showFormModal, setShowFormModal] = useState(false);

	// All the content showed on the import page
	return (
		<div className='flex flex-col gap-10'>
			<FileUploadArea />

			<SingleTransactionUploadFormButton
				onClick={() => {
					setShowFormModal(true);
				}}
			/>
			{/* Conditionally renders the form based in the showFormModal variable*/}
			{showFormModal && (
				<UploadFormModal onClose={() => setShowFormModal(false)} />
			)}

			<ImportSummaryCard />
		</div>
	);
}

export default ImportPage;
