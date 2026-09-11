import { useEffect, useState } from "react";

function ImportSummaryCard() {
	const data = {
		file: " monzo-may-2025.csv",
		bank: "Monzo",
		numRowsImported: 47,
		numRowsSkipped: 3,
		timeOfImport: "2025-09-5",
	};

	// const [data, setData] = useState<any>(null);
	// Function that sends a GET request to the backend to retrieve the import summary
	async function getImportSummary() {
		try {
			// GET request to the backend
			const response = await fetch("http://localhost:3000/api/import", {
				method: "GET",
			});

			if (!response.ok) {
				throw new Error(`HTTP error status ${response.status}`);
			}
			const data = await response.json();
			setData(data);
			console.log(data);
		} catch (error) {
			console.error(
				`Fetch failed: ${error instanceof Error ? error.message : String(error)}`,
			);
		}
	}

	// Runs the function to get all transactions when the page is navigated to
	// useEffect(() => {
	// 	async function load() {
	// 		await getImportSummary();
	// 	}
	// 	load().catch(console.error);
	// }, []);

	return (
		<div className='w-full rounded-xl border border-emerald-400 bg-emerald-950/70 px-4 py-4  shadow-sm'>
			<h2 className='mb-4 text-base font-medium tracking-widest text-emerald-300'>
				LAST IMPORT SUCCESSFUL
			</h2>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>File</span>
				<span className='text-right text-slate-200'>{data.file}</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Bank detected</span>
				<span className='text-right text-slate-200'>{data.bank}</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Transactions imported</span>
				<span className='text-right text-slate-200'>
					{data.numRowsImported}
				</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Rows skipped</span>
				<span className='text-right text-slate-200'>{data.numRowsSkipped}</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Imported at</span>
				<span className='text-right text-slate-200'>{data.timeOfImport}</span>
			</div>
		</div>
	);
}
export default ImportSummaryCard;
