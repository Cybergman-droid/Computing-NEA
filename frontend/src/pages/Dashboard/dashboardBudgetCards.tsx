import DashboardBudgetCard from "./dashboardBudgetCard";
type BudgetData = {
	budgetCategory: string;
	currentTotal: number;
	budgetLimit: number;
};
export default function DashboardBudgetCards() {
	const budgetTestData: BudgetData[] = [
		{ budgetCategory: "Eating Out", currentTotal: 150, budgetLimit: 100 },
		{ budgetCategory: "Transport", currentTotal: 60, budgetLimit: 100 },
		{ budgetCategory: "Entertainment", currentTotal: 70, budgetLimit: 100 },
		{ budgetCategory: "Subscriptions", currentTotal: 69, budgetLimit: 100 },
		{ budgetCategory: "Shopping", currentTotal: 85, budgetLimit: 100 },
	];
	return (
		<div className='card bg-base-0 w-full shadow-sm'>
			<div className='card-body'>
				<h2 className='card-title'>Budget Status</h2>
				<div className='flex flex-row gap-6'>
					{budgetTestData.map((budgetData, index) => (
						<DashboardBudgetCard
							key={index}
							budgetCategory={budgetData.budgetCategory}
							currentTotal={budgetData.currentTotal}
							budgetLimit={budgetData.budgetLimit}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
