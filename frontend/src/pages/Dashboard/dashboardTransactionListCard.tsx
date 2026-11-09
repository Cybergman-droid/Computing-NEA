import DashboardTransactionElement from "./dashboardTransactionElement";

export default function DashboardTransactionListCard() {
	// TODO fetch data from the backend and pass it to the components

	const description = "Uber";
	const category = "Transport";
	const amount = 15.345242;
	return (
		<div className='card bg-base-100 w-96 shadow-sm'>
			<div className='card-body'>
				<h2 className='card-title'>Recent Transactions</h2>
				<DashboardTransactionElement
					description={description}
					category={category}
					amount={amount}
				/>
				<DashboardTransactionElement
					description={description}
					category={category}
					amount={amount}
				/>
				<DashboardTransactionElement
					description={description}
					category={category}
					amount={amount}
				/>
				<DashboardTransactionElement
					description={description}
					category={category}
					amount={amount}
				/>
			</div>
		</div>
	);
}
