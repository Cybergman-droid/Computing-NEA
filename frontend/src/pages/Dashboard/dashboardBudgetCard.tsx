export default function DashboardBudgetCard() {
	const budgetCategory = "Subscriptions";
	const currentTotal = 50;
	const budgetLimit = 200;
	return (
		<>
			<div className='card w-96 bg-base-100 card-md shadow-sm'>
				<div className='card-body'>
					<h2 className='card-title'>{budgetCategory} </h2>
					<p>
						{currentTotal.toLocaleString("en-GB", {
							style: "currency",
							currency: "GBP",
						})}
						/
						{budgetLimit.toLocaleString("en-GB", {
							style: "currency",
							currency: "GBP",
						})}
					</p>
				</div>
			</div>
		</>
	);
}
