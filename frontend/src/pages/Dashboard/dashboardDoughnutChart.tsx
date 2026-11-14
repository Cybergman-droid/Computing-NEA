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
	const doughnutTestData = [300, 50, 100, 450, 845, 48, 45, 15, 445, 874];
	const dataObj: ChartData<"doughnut"> = {
		labels: categoryDropdownOptions,
		datasets: [
			{
				label: "Amount Spent",
				data: doughnutTestData,
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
			<Doughnut data={dataObj} />
		</div>
	);
}
