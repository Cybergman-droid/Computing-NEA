import type { ReactNode } from "react";
type ButtonProps = {
	children: ReactNode;
};

function NavbarButton({ children }: ButtonProps) {
	return (
		<button className='btn btn-outline btn-accent rounded-3xl'>
			{children}
		</button>
	);
}
function Navbar() {
	return (
		<div className='flex gap-2.5 justify-center'>
			<NavbarButton>Dashboard</NavbarButton>
			<NavbarButton>Charts</NavbarButton>
			<NavbarButton>File upload</NavbarButton>
			<NavbarButton>Budgets</NavbarButton>
			<NavbarButton>Transactions</NavbarButton>
			<NavbarButton>Calculators</NavbarButton>
		</div>
	);
}
export default Navbar;
