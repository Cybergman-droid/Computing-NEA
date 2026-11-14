type DashboardBudgetCardProps = {
	budgetCategory: string;
	currentTotal: number;
	budgetLimit: number;
};

export default function DashboardBudgetCard({
	budgetCategory,
	currentTotal,
	budgetLimit,
}: DashboardBudgetCardProps) {
	const percentage = currentTotal / budgetLimit;
	let progressBarColour;

	if (percentage >= 0.9) {
		progressBarColour = "progress progress-error"; // Red when the bar is > 90%
	} else if (percentage >= 0.7) {
		progressBarColour = "progress progress-warning"; // Yellow when the bar is > 70%
	} else {
		progressBarColour = "progress progress-success"; // Green the rest of the time
	}

	return (
		<>
			<div className='card w-full bg-base-100 card-md shadow-sm'>
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
					<progress
						className={progressBarColour}
						value={percentage * 100}
						max='100'
					></progress>
				</div>
			</div>
		</>
	);
}
