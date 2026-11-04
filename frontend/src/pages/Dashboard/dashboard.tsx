import DashboardStatCard from "./dashboardStatCard";

function DashboardPlaceholder() {
	const income = 19000.0;
	const balance = 456.79;
	const spent = 1352.0;
	return (
		<>
			<div className='flex flex-row gap-4'>
				<div className='bg-base-300'>
					<DashboardStatCard title='Balance' data={balance}></DashboardStatCard>
				</div>

				<div className='bg-base-300'>
					<DashboardStatCard
						title='Income This Month'
						data={income}
					></DashboardStatCard>
				</div>

				<div className='bg-base-300'>
					<DashboardStatCard
						title='Spent This Month'
						data={spent}
					></DashboardStatCard>
				</div>
			</div>
		</>
	);
}

export default DashboardPlaceholder;
