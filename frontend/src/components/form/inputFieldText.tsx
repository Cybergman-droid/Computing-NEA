type TextInputFieldProps = {
	placeholderString: string;
	variant?: string;
};

function TextInputField({ placeholderString, variant }: TextInputFieldProps) {
	if (variant === "transactionDescription") {
		return (
			<textarea
				className='textarea textarea-info w-full h-30 resize-none'
				placeholder={placeholderString}
			></textarea>
		);
	} else {
		return (
			<input
				className='input input-info w-full'
				type='text'
				placeholder={placeholderString}
			/>
		);
	}
}

export default TextInputField;
