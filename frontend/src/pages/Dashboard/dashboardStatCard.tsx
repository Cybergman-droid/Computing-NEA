type DashboardStatCardProps = {
	title: string;
	data: number;
};
export default function DashboardStatCard({
	title,
	data,
}: DashboardStatCardProps) {
	return (
		<div className='card bg-base-100 w-96 shadow-sm'>
			<div className='card-body'>
				<h2 className='card-title text-gray-500'>{title}</h2>
				<p className='text-purple-700 text-2xl font-[550]'>
					£{data.toLocaleString()}
				</p>
			</div>
		</div>
	);
}
