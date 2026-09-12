import { useEffect, useState } from "react";

type ImportSummary = {
	id: number;
	filename: string;
	bank: string;
	imported: number;
	skipped: number;
	date: string;
};
type ImportSummaryCardProps = {
	reImportSummary: boolean;
};
function ImportSummaryCard({ reImportSummary }: ImportSummaryCardProps) {
	const [data, setData] = useState<ImportSummary | null>(null);

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

	// Runs the function to get the import log when the page is navigated to
	useEffect(() => {
		async function load() {
			await getImportSummary();
		}
		load().catch(console.error);
	}, [reImportSummary]);

	// Displays the data on the page
	return (
		<div className='w-full rounded-xl border border-emerald-400 bg-emerald-950/70 px-4 py-4  shadow-sm'>
			<h2 className='mb-4 text-base font-medium tracking-widest text-emerald-300'>
				LAST IMPORT SUCCESSFUL
			</h2>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>File</span>
				<span className='text-right text-slate-200'>{data?.filename}</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Bank detected</span>
				<span className='text-right text-slate-200'>{data?.bank}</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Transactions imported</span>
				<span className='text-right text-slate-200'>{data?.imported}</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Rows skipped</span>
				<span className='text-right text-slate-200'>{data?.skipped}</span>
			</div>

			<div className='mb-2 flex items-center justify-between gap-6 rounded-md border border-emerald-400/25 bg-emerald-900/20 px-3 py-2 text-sm last:mb-0'>
				<span className='text-slate-400'>Imported at</span>
				<span className='text-right text-slate-200'>{data?.date}</span>
			</div>
		</div>
	);
}
export default ImportSummaryCard;
