type NumberInputFieldProps = {
	placeholderString: string;
};

function NumberInputField({ placeholderString }: NumberInputFieldProps) {
	return (
		<input
			className='input input-warning w-full'
			type='number'
			placeholder={placeholderString}
		/>
	);
}

export default NumberInputField;
