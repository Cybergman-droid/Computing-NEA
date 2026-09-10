import { useState } from "react";
import UploadFormModal from "./uploadFormModal.tsx";
import SingleTransactionUploadFormButton from "./singleTranasctionFormButton.tsx";

function ImportPage() {
	// Tracks whether the form should be rendered
	const [showFormModal, setShowFormModal] = useState(false);
	const handleClick = () => {
		setShowFormModal(true);
	};

	// All the content showed on the import page
	return (
		<div className='flex flex-col'>
			<SingleTransactionUploadFormButton onClick={handleClick} />
			{/* Conditionally renders the form based in the showFormModal variable*/}
			{showFormModal && (
				<UploadFormModal onClose={() => setShowFormModal(false)} />
			)}
		</div>
	);
}

export default ImportPage;
