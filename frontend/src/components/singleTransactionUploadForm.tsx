import { type ReactElement, type ReactNode } from "react";

type DropdownProps = {
	defaultOption: string;
	dropdownOptions: string[];
};
// Submit button dispalyed in the form to submit it
function SubmitButton() {
	return <button className='btn btn-outline btn-success'>Submit</button>;
}

// dropdown menu that displays options dynamiclly from an array that is passed as a prop that will be displayed on the form
function DropdownMenu({ defaultOption, dropdownOptions }: DropdownProps) {
	return (
		<select defaultValue={defaultOption} className='select select-neutral'>
			<option disabled={true}>{defaultOption}</option>

			{dropdownOptions.map((dropdownOption) => (
				<option key={dropdownOption} value={dropdownOption}>
					{dropdownOption}
				</option>
			))}
		</select>
	);
}
