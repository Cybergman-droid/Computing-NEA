import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import TransactionsPlaceholder from "./pages/Transactions/transactions.tsx";
import CalculatorsPlaceholder from "./pages/Calculators/calculators.tsx";
import ImportPlaceholder from "./pages/Import/import.tsx";
import BudgetsPlaceholder from "./pages/Budgets/budgets.tsx";
import ChartsPlaceholder from "./pages/Charts/charts.tsx";
import DashboardPlaceholder from "./pages/Dashboard/dashboard.tsx";

function App() {
	return (
		<>
			<div className='bg-base-300'>
				<Navbar />
				{/* Defines the paths ond the components that will be rendered when navigated to that path*/}
				<Routes>
					<Route path='/' element={<DashboardPlaceholder />} />
					<Route path='/Charts' element={<ChartsPlaceholder />} />
					<Route path='/Import' element={<ImportPlaceholder />} />
					<Route path='/Budgets' element={<BudgetsPlaceholder />} />
					<Route path='/Transactions' element={<TransactionsPlaceholder />} />
					<Route path='/Calculators' element={<CalculatorsPlaceholder />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
