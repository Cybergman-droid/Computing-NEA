import { useEffect, useState } from "react";

function TransactionsPlaceholder() {
	const [data, setData] = useState<any>(null);
	async function getAllTransactions() {
		try {
			const response = await fetch(`http://localhost:3000/api/transactions`);

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

	useEffect(() => {
		async function load() {
			await getAllTransactions();
		}
		load().catch(console.error);
	}, []);

	return (
		<div className='bg-base-300'>
			<div className='min-h-screen bg-base-300 flex items-center justify-center'>
				<div className='card bg-base-200 shadow-xl p-8'>
					<h1 className='text-3xl font-bold text-primary mb-4'>
						Finance Dashboard
					</h1>
					<p className='text-base-content'>Transactions Page</p>
					<pre className='text-base-content'>
						{JSON.stringify(data, null, 2)}
					</pre>

					<button className='btn btn-primary mt-4'>Test button</button>
				</div>
			</div>
		</div>
	);
}

export default TransactionsPlaceholder;
