import DashboardStatCard from "./dashboardStatCard";

export default function DashboardStatCards() {
	// TODO fetch data from the backend and pass it to the components

	const income = 19000.0;
	const balance = 456.79;
	const spent = 1352.0;

	return (
		<div className='card bg-base-0 w-full shadow-sm flex flex-row gap-6'>
			<DashboardStatCard title='Balance' amount={balance} variant='balance' />

			<DashboardStatCard
				title='Income This Month'
				amount={income}
				variant='income'
			/>

			<DashboardStatCard
				title='Spent This Month'
				amount={spent}
				variant='spent'
			/>
		</div>
	);
}
