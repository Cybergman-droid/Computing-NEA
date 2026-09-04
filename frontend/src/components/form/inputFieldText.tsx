type TextInputFieldProps = {
	placeholderString: string;
	variant?: string;
};

function TextInputField({ placeholderString, variant }: TextInputFieldProps) {
	switch (variant) {
		case "transactionDescription":
			return (
				<textarea
					className='textarea textarea-info w-full h-30 resize-none'
					placeholder={placeholderString}
				></textarea>
			);
			break;

		default:
			return (
				<input
					className='input input-info w-full'
					type='text'
					placeholder={placeholderString}
				/>
			);
			break;
	}
}

export default TextInputField;
