import {
    type ReactElement,
    type ReactNode,
    type SyntheticEvent,
    useState,
} from "react";
import {Link} from "react-router-dom";

type ButtonProps = {
    children: ReactNode;
    focused?: boolean;
};

// Navbar button that is rendered in the navbar
function NavbarButton({children, focused}: ButtonProps): ReactElement {
    if (focused) {
        return (
            <button className="btn btn-focused btn-secondary rounded-3xl">
                {children}
            </button>
        );
    } else {
        return (
            <button className="btn btn-outline btn-secondary rounded-3xl">
                {children}
            </button>
        );
    }
}

// Navbar element that is rendered at the top of every page with react router functionality to link to different pages
function Navbar() {
    const [navbarPage, setNavbarPage] = useState("dashboard");
    const handleClick = (e: SyntheticEvent): void => {
        const buttonText: string = e.target.innerHTML;
        console.log(`Clicked element: ${e.target}`);
        console.log(e);
        if (e.target instanceof HTMLElement) {
            console.log(`Clicked element content: ${buttonText}`);
        }
        if (e.target instanceof HTMLButtonElement) {
            setNavbarPage(buttonText.toLowerCase());
        } else {
            console.log("Button element not clicked ");
        }
    };
    switch (navbarPage) {
        case "dashboard":
            return (
                <nav className="flex gap-10 justify-center" onClick={handleClick}>
                    {/* Defined the paths that the button will link to when pressed */}
                    <Link to="/">
                        <NavbarButton focused={true}>Dashboard</NavbarButton>
                    </Link>
                    <Link to="/Charts">
                        <NavbarButton>Charts</NavbarButton>
                    </Link>
                    <Link to="/Import">
                        <NavbarButton>File upload</NavbarButton>
                    </Link>
                    <Link to="/Budgets">
                        <NavbarButton>Budgets</NavbarButton>
                    </Link>
                    <Link to="/Transactions">
                        <NavbarButton>Transactions</NavbarButton>
                    </Link>
                    <Link to="/Calculators">
                        <NavbarButton>Calculators</NavbarButton>
                    </Link>
                </nav>
            );

        case "charts":
            return (
                <nav className="flex gap-10 justify-center" onClick={handleClick}>
                    {/* Defined the paths that the button will link to when pressed */}
                    <Link to="/">
                        <NavbarButton>Dashboard</NavbarButton>
                    </Link>
                    <Link to="/Charts">
                        <NavbarButton focused={true}>Charts</NavbarButton>
                    </Link>
                    <Link to="/Import">
                        <NavbarButton>File upload</NavbarButton>
                    </Link>
                    <Link to="/Budgets">
                        <NavbarButton>Budgets</NavbarButton>
                    </Link>
                    <Link to="/Transactions">
                        <NavbarButton>Transactions</NavbarButton>
                    </Link>
                    <Link to="/Calculators">
                        <NavbarButton>Calculators</NavbarButton>
                    </Link>
                </nav>
            );
        case "file upload":
            return (
                <nav className="flex gap-10 justify-center" onClick={handleClick}>
                    {/* Defined the paths that the button will link to when pressed */}
                    <Link to="/">
                        <NavbarButton>Dashboard</NavbarButton>
                    </Link>
                    <Link to="/Charts">
                        <NavbarButton>Charts</NavbarButton>
                    </Link>
                    <Link to="/Import">
                        <NavbarButton focused={true}>File upload</NavbarButton>
                    </Link>
                    <Link to="/Budgets">
                        <NavbarButton>Budgets</NavbarButton>
                    </Link>
                    <Link to="/Transactions">
                        <NavbarButton>Transactions</NavbarButton>
                    </Link>
                    <Link to="/Calculators">
                        <NavbarButton>Calculators</NavbarButton>
                    </Link>
                </nav>
            );
        case "budgets":
            return (
                <nav className="flex gap-10 justify-center" onClick={handleClick}>
                    {/* Defined the paths that the button will link to when pressed */}
                    <Link to="/">
                        <NavbarButton>Dashboard</NavbarButton>
                    </Link>
                    <Link to="/Charts">
                        <NavbarButton>Charts</NavbarButton>
                    </Link>
                    <Link to="/Import">
                        <NavbarButton>File upload</NavbarButton>
                    </Link>
                    <Link to="/Budgets">
                        <NavbarButton focused={true}>Budgets</NavbarButton>
                    </Link>
                    <Link to="/Transactions">
                        <NavbarButton>Transactions</NavbarButton>
                    </Link>
                    <Link to="/Calculators">
                        <NavbarButton>Calculators</NavbarButton>
                    </Link>
                </nav>
            );
        case "transactions":
            return (
                <nav className="flex gap-10 justify-center" onClick={handleClick}>
                    {/* Defined the paths that the button will link to when pressed */}
                    <Link to="/">
                        <NavbarButton>Dashboard</NavbarButton>
                    </Link>
                    <Link to="/Charts">
                        <NavbarButton>Charts</NavbarButton>
                    </Link>
                    <Link to="/Import">
                        <NavbarButton>File upload</NavbarButton>
                    </Link>
                    <Link to="/Budgets">
                        <NavbarButton>Budgets</NavbarButton>
                    </Link>
                    <Link to="/Transactions">
                        <NavbarButton focused={true}>Transactions</NavbarButton>
                    </Link>
                    <Link to="/Calculators">
                        <NavbarButton>Calculators</NavbarButton>
                    </Link>
                </nav>
            );

        case "calculators":
            return (
                <nav className="flex gap-10 justify-center" onClick={handleClick}>
                    {/* Defined the paths that the button will link to when pressed */}
                    <Link to="/">
                        <NavbarButton>Dashboard</NavbarButton>
                    </Link>
                    <Link to="/Charts">
                        <NavbarButton>Charts</NavbarButton>
                    </Link>
                    <Link to="/Import">
                        <NavbarButton>File upload</NavbarButton>
                    </Link>
                    <Link to="/Budgets">
                        <NavbarButton>Budgets</NavbarButton>
                    </Link>
                    <Link to="/Transactions">
                        <NavbarButton>Transactions</NavbarButton>
                    </Link>
                    <Link to="/Calculators">
                        <NavbarButton focused={true}>Calculators</NavbarButton>
                    </Link>
                </nav>
            );
    }
}

// Exports the Navbar component so that it can be used in other places
export default Navbar;
