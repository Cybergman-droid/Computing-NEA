type DashboardStatCardProps = {
	title: string;
	amount: number;
	variant: "balance" | "income" | "spent";
};
export default function DashboardStatCard({
	title,
	amount,
	variant,
}: DashboardStatCardProps) {
	const colors = {
		balance: "text-purple-700",
		income: "text-green-700",
		spent: "text-red-700",
	};
	return (
		<div className='card bg-base-100 w-full shadow-sm'>
			<div className='card-body'>
				<h2 className='card-title text-gray-500'>{title}</h2>
				<p className={`${colors[variant]} text-2xl font-[550]`}>
					{amount.toLocaleString("en-GB", {
						style: "currency",
						currency: "GBP",
					})}
				</p>
			</div>
		</div>
	);
}
