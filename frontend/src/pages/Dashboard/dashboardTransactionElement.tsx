type DashboardTransactionElementProps = {
	description: string;
	category: string;
	amount: number;
};

export default function DashboardTransactionElement({
	description,
	category,
	amount,
}: DashboardTransactionElementProps) {
	return (
		<>
			<div className='flex justify-between gap-4'>
				<div>
					<p>{description}</p>
					<div className='badge badge-outline badge-secondary'>{category}</div>
				</div>

				<div>
					<p>
						{amount.toLocaleString("en-GB", {
							style: "currency",
							currency: "GBP",
						})}
					</p>
				</div>
			</div>
			<div className='divider'></div>
		</>
	);
}

{
	/* <div className='badge badge-outline badge-primary'>Primary</div>
			<div className='badge badge-outline badge-secondary'>Secondary</div>
			<div className='badge badge-outline badge-accent'>Accent</div>
			<div className='badge badge-outline badge-info'>Info</div>
			<div className='badge badge-outline badge-success'>Success</div>
			<div className='badge badge-outline badge-warning'>Warning</div>
			<div className='badge badge-outline badge-error'>Error</div> */
}
