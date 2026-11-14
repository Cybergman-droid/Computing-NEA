import DashboardBudgetCards from "./dashboardBudgetCards";
import DashboardDoughnutChart from "./dashboardDoughnutChart";
import DashboardImportSummaryCard from "./dashboardImportSummaryCard";
import DashboardStatCards from "./dashboardStatCards";
import DashboardTransactionListCard from "./dashboardTransactionListCard";

function DashboardPage() {
	return (
		<>
			<DashboardStatCards />
			<div className=' flex flex-row gap-4'>
				<DashboardTransactionListCard />

				<DashboardDoughnutChart />
			</div>

			<DashboardBudgetCards />

			<DashboardImportSummaryCard />
		</>
	);
}

export default DashboardPage;
