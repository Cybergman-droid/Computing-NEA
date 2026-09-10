function ImportSummaryCard() {
	const importSummary = {
		file: " monzo-may-2025.csv",
		bank: "Monzo",
		numRowsImported: 47,
		numRowsSkipped: 3,
		timeOfImport: "2025-09-5",
	};

	return (
		<div className='w-full rounded-xl border border-emerald-400 bg-emerald-950/70 px-4 py-4  shadow-sm'>
			<h2 className='mb-4 text-base font-medium tracking-widest text-emerald-300'>
				LAST IMPORT SUCCESSFUL
			</h2>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>File</span>
				<span className='text-right text-slate-200'>{importSummary.file}</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Bank detected</span>
				<span className='text-right text-slate-200'>{importSummary.bank}</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Transactions imported</span>
				<span className='text-right text-slate-200'>
					{importSummary.numRowsImported}
				</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Rows skipped</span>
				<span className='text-right text-slate-200'>
					{importSummary.numRowsSkipped}
				</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Imported at</span>
				<span className='text-right text-slate-200'>
					{importSummary.timeOfImport}
				</span>
			</div>
		</div>
	);
}
export default ImportSummaryCard;
