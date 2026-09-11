import { useEffect, useState } from "react";

function TransactionFeedback({ response }: { response: Response | unknown }) {
	const [data, setData] = useState<any>(null);

	useEffect(() => {
		async function load() {
			if (response instanceof Response) {
				const json = await response.json();
				setData(json);
			} else {
				// error thrown by validator
				setData({ message: String(response) });
			}
		}
		load().catch((error) => {
			setData({ message: String(error) });
		});
	}, [response]);

	if (!data) {
		return <div className='alert alert-info'>Loading...</div>;
	}

	if (response instanceof Response) {
		switch (response.status) {
			case 201:
				return (
					<div
						role='alert'
						className='alert alert-success alert-soft flex items-center justify-center'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 shrink-0 stroke-current'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<span>{data.message}</span>
					</div>
				);

			case 400:
				return (
					<div
						role='alert'
						className='alert alert-error alert-soft flex items-center justify-center'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 shrink-0 stroke-current'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<span>{data.message}</span>
					</div>
				);

			default:
				return (
					<div
						role='alert'
						className='alert alert-warning alert-soft flex items-center justify-center'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 shrink-0 stroke-current'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
							/>
						</svg>
						<span>Unexpected response from backend</span>
					</div>
				);
		}
	}

	// If it's an error thrown by your validator
	return (
		<div
			role='alert'
			className='alert alert-error alert-soft flex items-center justify-center'
		>
			<span>{String(response)}</span>
		</div>
	);
}

export default TransactionFeedback;
