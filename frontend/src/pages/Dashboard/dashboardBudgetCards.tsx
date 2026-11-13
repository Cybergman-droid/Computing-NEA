import DashboardBudgetCard from "./dashboardBudgetCard";

export default function DashboardBudgetCards() {
	return (
		<div className='flex flex-row gap 6'>
			<DashboardBudgetCard />
			<DashboardBudgetCard />
			<DashboardBudgetCard />
		</div>
	);
}
