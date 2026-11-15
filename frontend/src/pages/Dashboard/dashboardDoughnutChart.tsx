import { Doughnut } from "react-chartjs-2";

import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	type ChartData,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardDoughnutChart() {
	const categoryDropdownOptions = [
		"Groceries",
		"Transport",
		"Eating Out",
		"Shopping",
		"Entertainment",
		"Utilities",
		"Income",
		"Savings",
		"Subscriptions",
		"Miscellaneous",
	];
	const diffTestData = [
		{ id: "Groceries", value: 300 },
		{ id: "Transport", value: 50 },
		{ id: "Eating Out", value: 100 },
		{ id: "Shopping", value: 450 },
		{ id: "Entertainment", value: 845 },
		{ id: "Utilities", value: 48 },
		{ id: "Income", value: 45 },
		{ id: "Savings", value: 15 },
		{ id: "Subscriptions", value: 445 },
		{ id: "Miscellaneous", value: 874 },
	];

	const options = {
		parsing: {
			key: "value",
		},
	};

	const dataObj: ChartData<"doughnut", { id: string; value: number }[]> = {
		labels: categoryDropdownOptions,
		datasets: [
			{
				label: "Amount Spent",
				data: diffTestData,
				backgroundColor: [
					"rgb(255, 99, 132)",
					"rgb(54, 162, 235)",
					"rgb(255, 205, 86)",
					"rgb(75, 192, 192)",
					"rgb(153, 102, 255)",
					"rgb(255, 159, 64)",
					"rgb(201, 203, 207)",
					"rgb(46, 204, 113)",
					"rgb(241, 196, 15)",
					"rgb(52, 73, 94)",
				],
				hoverOffset: 4,
			},
		],
	};

	return (
		<div className='h-200 w-200'>
			<Doughnut options={options} data={dataObj} />
		</div>
	);
}
