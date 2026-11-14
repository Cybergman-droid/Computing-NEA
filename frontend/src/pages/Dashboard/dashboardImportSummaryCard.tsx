type ImportSummaryData = {
	filename: string;
	bank: string;
	imported: number;
	skipped: number;
};
export default function DashboardImportSummaryCard() {
	// TODO fetch data from the backend and pass it to the elements

	const testData: ImportSummaryData = {
		filename: "100RowBarclaysTestCsv.csv",
		bank: "Barclays",
		imported: 47,
		skipped: 3,
	};

	return (
		<>
			<div className='card bg-base-100 w-full shadow-sm'>
				<div className='card-body gap-1 p-4'>
					<h2 className='card-title'> Last Import</h2>

					<div className='flex w-full justify-between'>
						<p>File</p>
						<p className='ml-auto min-w-0 break-all text-right'>
							{testData.filename}
						</p>
					</div>
					<div className='divider my-1'></div>

					<div className='flex w-full justify-between'>
						<p>Bank</p>
						<p className='ml-auto text-right'>{testData.bank}</p>
					</div>
					<div className='divider my-1'></div>

					<div className='flex flex-row justify-between gap-4'>
						<p>Imported</p>
						<p className='ml-auto text-right text-green-400'>
							{testData.imported} transactions
						</p>
					</div>
					<div className='divider my-1'></div>

					<div className='flex flex-row justify-between gap-4'>
						<p>Skipped</p>
						<p className='ml-auto text-right text-yellow-500'>
							{testData.skipped} rows
						</p>
					</div>
					<div className='divider my-1'></div>
				</div>
			</div>
		</>
	);
}
