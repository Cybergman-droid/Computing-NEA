import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import TransactionsPlaceholder from "./pages/transactions";
import CalculatorsPlaceholder from "./pages/calculators";
import ImportPlaceholder from "./pages/import";
import BudgetsPlaceholder from "./pages/budgets";
import ChartsPlaceholder from "./pages/charts";
import DashboardPlaceholder from "./pages/dashboard";

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
