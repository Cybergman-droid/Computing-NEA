type DropdownProps = {
	defaultOption: string;
	dropdownOptions: string[];
};

// dropdown menu that displays options dynamiclly from an array that is passed as a prop that will be displayed on the form
function DropdownMenu({ defaultOption, dropdownOptions }: DropdownProps) {
	return (
		<select
			defaultValue={defaultOption}
			className='select select-neutral w-full'
		>
			<option disabled={true}>{defaultOption}</option>

			{dropdownOptions.map((dropdownOption) => (
				<option key={dropdownOption} value={dropdownOption}>
					{dropdownOption}
				</option>
			))}
		</select>
	);
}

export default DropdownMenu;
