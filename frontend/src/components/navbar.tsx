import type { ReactNode } from "react";
type ButtonProps = {
	children: ReactNode;
};

function NavbarButton({ children }: ButtonProps) {
	return (
		<button className='btn btn-soft btn-primary rounded-3xl'>{children}</button>
	);
}
function Navbar() {
	return (
		<div className='flex gap-2.5'>
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
