type DashboardTransactionElementProps = {
	description: string;
	category: string;
	amount: number;
};

export default function DashboardTransactionElement({
	description,
	category,
	amount,
}: DashboardTransactionElementProps) {
	// Renders a different badge colour based on the category in the transaction
	let categoryComponent;

	switch (category) {
		case "Groceries":
			categoryComponent = (
				<div className='badge badge-outline badge-secondary'>{category}</div>
			);
			break;

		case "Transport":
			categoryComponent = (
				<div className='badge badge-outline badge-primary'>{category}</div>
			);
			break;

		case "Eating Out":
			categoryComponent = (
				<div className='badge badge-outline badge-accent'>{category}</div>
			);
			break;

		case "Shopping":
			categoryComponent = (
				<div className='badge badge-outline badge-info'>{category}</div>
			);
			break;

		case "Entertainment":
			categoryComponent = (
				<div className='badge badge-outline badge-error'>{category}</div>
			);
			break;

		case "Utilities":
			categoryComponent = (
				<div className='badge badge-outline badge-warning'>{category}</div>
			);
			break;

		case "Income":
			categoryComponent = (
				<div className='badge badge-outline badge-success'>{category}</div>
			);
			break;

		case "Savings":
			categoryComponent = (
				<div
					className='badge badge-outline'
					style={{ color: "#0f766e", borderColor: "#0f766e" }}
				>
					{category}
				</div>
			);
			break;

		case "Subscriptions":
			categoryComponent = (
				<div
					className='badge badge-outline'
					style={{ color: "#7e22ce", borderColor: "#7e22ce" }}
				>
					{category}
				</div>
			);
			break;

		case "Miscellaneous":
			categoryComponent = (
				<div
					className='badge badge-outline'
					style={{ color: "#475569", borderColor: "#475569" }}
				>
					{category}
				</div>
			);
			break;

		default:
			<div className='badge badge-outline'>{category}</div>;
			break;
	}

	return (
		<>
			<div className='flex justify-between gap-4'>
				<div>
					<p>{description}</p>
					{categoryComponent}
				</div>

				{/* Conditionally renders red text if the amount is negative,
				or green text if the amount is positive */}
				<div>
					{amount > 0 ? (
						<p className='text-green-500'>
							{amount.toLocaleString("en-GB", {
								style: "currency",
								currency: "GBP",
							})}
						</p>
					) : (
						<p className='text-red-500'>
							{amount.toLocaleString("en-GB", {
								style: "currency",
								currency: "GBP",
							})}
						</p>
					)}
				</div>
			</div>
			<div className='divider'></div>
		</>
	);
}

{
	/*
	 */
}
