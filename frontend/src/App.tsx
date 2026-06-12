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
				<Routes>
					<Route path='/' element={<DashboardPlaceholder />} />
					<Route path='/Charts' element={<ChartsPlaceholder />} />
					<Route path='/Import' element={<ImportPlaceholder />} />
					<Route path='/Budgets' element={<BudgetsPlaceholder />} />
					<Route path='/Transactions' element={<TransactionsPlaceholder />} />
					<Route path='/Calculators' element={<CalculatorsPlaceholder />} />
				</Routes>
				<div className='min-h-screen bg-base-300 flex items-center justify-center'>
					<div className='card bg-base-200 shadow-xl p-8'>
						<h1 className='text-3xl font-bold text-primary mb-4'>
							Finance Dashboard
						</h1>
						<p className='text-base-content'>
							Tailwind and DaisyUI are working
						</p>
						<button className='btn btn-primary mt-4'>Test button</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
