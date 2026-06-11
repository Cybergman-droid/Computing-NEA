import type { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
	children: ReactNode;
};

// Navbar button that is rendered in the navbar
function NavbarButton({ children }: ButtonProps): ReactElement {
	return (
		<button className='btn btn-outline btn-secondary rounded-3xl'>
			{children}
		</button>
	);
}

// Navbar element that is rendered at the top of every page
function Navbar() {
	return (
		<nav className='flex gap-10 justify-center'>
			<Link to='/'>
				<NavbarButton>Dashboard</NavbarButton>
			</Link>
			<Link to='/Charts'>
				<NavbarButton>Charts</NavbarButton>
			</Link>
			<Link to='/Import'>
				<NavbarButton>File upload</NavbarButton>
			</Link>
			<Link to='/Budgets'>
				<NavbarButton>Budgets</NavbarButton>
			</Link>
			<Link to='/Transactions'>
				<NavbarButton>Transactions</NavbarButton>
			</Link>
			<Link to='/Calculators'>
				<NavbarButton>Calculators</NavbarButton>
			</Link>
		</nav>
	);
}

// Exports the Navbar component so that it can be used in other places
export default Navbar;
