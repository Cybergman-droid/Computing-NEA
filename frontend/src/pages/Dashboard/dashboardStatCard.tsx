type DashboardStatCardProps = {
	title: string;
	amount: number;
};
export default function DashboardStatCard({
	title,
	amount,
}: DashboardStatCardProps) {
	return (
		<div className='card bg-base-100 w-96 shadow-sm'>
			<div className='card-body'>
				<h2 className='card-title text-gray-500'>{title}</h2>
				<p className='text-purple-700 text-2xl font-[550]'>
					{amount.toLocaleString("en-GB", {
						style: "currency",
						currency: "GBP",
					})}
				</p>
			</div>
		</div>
	);
}
