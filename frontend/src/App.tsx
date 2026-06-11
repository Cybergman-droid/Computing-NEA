import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
	return (
		<BrowserRouter>
			<div className='bg-base-300'>
				<Navbar />
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
		</BrowserRouter>
	);
}

export default App;
