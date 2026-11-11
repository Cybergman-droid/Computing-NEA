import DashboardDoughnutChart from "./dashboardDoughnutChart";
import DashboardStatCards from "./dashboardStatCards";
import DashboardTransactionListCard from "./dashboardTransactionListCard";

function DashboardPage() {
	return (
		<>
			<DashboardStatCards />

			<DashboardTransactionListCard />

			<DashboardDoughnutChart />
		</>
	);
}

export default DashboardPage;
