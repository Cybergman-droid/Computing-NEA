import type { ReactElement, ReactNode } from "react";

type ButtonProps = {
	children: ReactNode;
};

function NavbarButton({ children }: ButtonProps): ReactElement {
	return (
		<button className='btn btn-outline btn-secondary rounded-3xl'>
			{children}
		</button>
	);
}

function Navbar() {
	return (
		<nav className='flex gap-10 justify-center'>
			<NavbarButton>Dashboard</NavbarButton>
			<NavbarButton>Charts</NavbarButton>
			<NavbarButton>File upload</NavbarButton>
			<NavbarButton>Budgets</NavbarButton>
			<NavbarButton>Transactions</NavbarButton>
			<NavbarButton>Calculators</NavbarButton>
		</nav>
	);
}
export default Navbar;
