import { type ReactElement, type ReactNode } from "react";
import { NavLink } from "react-router-dom";

type ButtonProps = {
	children: ReactNode;
	focused?: boolean;
};

// Navbar button that is rendered in the navbar with a variant for when the page is active
function NavbarButton({ children, focused }: ButtonProps): ReactElement {
	if (focused) {
		return (
			<button className='btn btn-sm whitespace-nowrap btn-focused btn-secondary rounded-3xl sm:btn-md'>
				{children}
			</button>
		);
	} else {
		return (
			<button className='btn btn-sm whitespace-nowrap btn-outline btn-secondary rounded-3xl sm:btn-md'>
				{children}
			</button>
		);
	}
}

// Navbar element that is rendered at the top of every page with react router functionality to link to different pages
// Highlights the button based on the isActive prop which checks if the current url matches the path
function Navbar() {
	return (
		<nav className='flex w-full flex-row flex-wrap items-center justify-center gap-2 px-3 py-4 sm:gap-4 sm:px-6 lg:gap-10'>
			{/* Defined the paths that the button will link to when pressed */}

			<NavLink to='/'>
				{({ isActive }) => (
					<NavbarButton focused={isActive}>Dashboard</NavbarButton>
				)}
			</NavLink>

			<NavLink to='/Charts'>
				{({ isActive }) => (
					<NavbarButton focused={isActive}>Charts</NavbarButton>
				)}
			</NavLink>

			<NavLink to='/Import'>
				{({ isActive }) => (
					<NavbarButton focused={isActive}>Import</NavbarButton>
				)}
			</NavLink>

			<NavLink to='/Budgets'>
				{({ isActive }) => (
					<NavbarButton focused={isActive}>Budgets</NavbarButton>
				)}
			</NavLink>

			<NavLink to='/Transactions' viewTransition={true}>
				{({ isActive }) => (
					<NavbarButton focused={isActive}>Transactions</NavbarButton>
				)}
			</NavLink>

			<NavLink to='/Calculators'>
				{({ isActive }) => (
					<NavbarButton focused={isActive}>Calculators</NavbarButton>
				)}
			</NavLink>
		</nav>
	);
}

export default Navbar;
