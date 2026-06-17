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
				{/* Define the path ond the conponent that will be rendered */}
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
