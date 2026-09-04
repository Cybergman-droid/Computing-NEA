import { type ComponentProps } from "react";
type DropdownProps = {
	dropdownOptions: string[];
} & ComponentProps<"select">;

// dropdown menu that displays options dynamiclly from an array
function DropdownMenu({ dropdownOptions, ...props }: DropdownProps) {
	return (
		<select {...props} className='select select-neutral w-full'>
			<option disabled={true}>{props.defaultValue}</option>

			{dropdownOptions.map((dropdownOption) => (
				<option key={dropdownOption} value={dropdownOption}>
					{dropdownOption}
				</option>
			))}
		</select>
	);
}

export default DropdownMenu;
