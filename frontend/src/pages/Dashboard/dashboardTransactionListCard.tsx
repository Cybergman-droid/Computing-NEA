import DashboardTransactionElement from "./dashboardTransactionElement";

export default function DashboardTransactionListCard() {
	// TODO fetch data from the backend and pass it to the components

	const testArray = [
		{
			id: 1,
			amount: -45.2,
			category: "Groceries",
			description: "TESCO SUPERSTORE",
			date: "2025-05-01",
			confidence: 18.131835891697158,
			auto_classified: 1,
			bank: "Barclays",
		},
		{
			id: 2,
			amount: -12.8,
			category: "Transport",
			description: "UBER TRIP",
			date: "2025-05-02",
			confidence: 18.22613881284539,
			auto_classified: 1,
			bank: "Barclays",
		},
		{
			id: 3,
			amount: 2500,
			category: "Income",
			description: "SALARY MAY",
			date: "2025-05-03",
			confidence: 18.41688991614328,
			auto_classified: 1,
			bank: "Barclays",
		},
		{
			id: 4,
			amount: -15.99,
			category: "Subscriptions",
			description: "NETFLIX SUBSCRIPTION",
			date: "2025-05-04",
			confidence: 46.660959330993265,
			auto_classified: 1,
			bank: "Barclays",
		},
		{
			id: 5,
			amount: -4.5,
			category: "Eating Out",
			description: "COSTA COFFEE",
			date: "2025-05-05",
			confidence: 31.24264350539902,
			auto_classified: 1,
			bank: "Barclays",
		},
	];

	return (
		<div className='card bg-base-100 w-96 shadow-sm'>
			<div className='card-body'>
				<h2 className='card-title'>Recent Transactions</h2>

				{/* Maps the data in the test array into the DashboardTransactionElement 
				which returns an array of DashboardTransactionElement components that can be rendered  */}

				{testArray.map((transaction, index) => (
					<DashboardTransactionElement
						key={index}
						description={transaction.description}
						category={transaction.category}
						amount={transaction.amount}
					/>
				))}
			</div>
		</div>
	);
}
