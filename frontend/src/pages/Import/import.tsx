import SingleTransactionUploadForm from "./singleTransactionUploadForm.tsx";

function ImportPlaceholder() {
	return (
		<div className='bg-base-300'>
			<div className='min-h-screen bg-base-300 flex items-center justify-center'>
				<div className='card bg-base-200 shadow-xl p-8'>
					<h1 className='text-3xl font-bold text-primary mb-4'>
						Finance Dashboard
					</h1>

					<p className='text-base-content'>Import Page</p>

					<button
						className='btn btn-primary mt-4'
						onClick={() =>
							(
								document.getElementById("uploadFormModal") as HTMLDialogElement
							)?.showModal()
						}
					>
						Open Form Modal
					</button>

					<dialog id='uploadFormModal' className='modal'>
						<div className='modal-box h-8/12 w-5/10'>
							<form method='dialog'>
								{/* if there is a button in form, it will close the modal */}
								<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
									✕
								</button>
							</form>

							<SingleTransactionUploadForm />
						</div>
					</dialog>
				</div>
			</div>
		</div>
	);
}

export default ImportPlaceholder;
