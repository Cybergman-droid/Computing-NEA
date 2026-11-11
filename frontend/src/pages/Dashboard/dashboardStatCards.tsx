import DashboardStatCard from "./dashboardStatCard";

export default function DashboardStatCards() {
	// TODO fetch data from the backend and pass it to the components

	const income = 19000.0;
	const balance = 456.79;
	const spent = 1352.0;

	return (
		<div className='flex flex-row gap-4'>
			<div className='bg-base-300'>
				<DashboardStatCard title='Balance' amount={balance} />
			</div>

			<div className='bg-base-300'>
				<DashboardStatCard title='Income This Month' amount={income} />
			</div>

			<div className='bg-base-300'>
				<DashboardStatCard title='Spent This Month' amount={spent} />
			</div>
		</div>
	);
}
