import { type ComponentProps } from "react";
type TextInputFieldProps = {
	variant?: string;
} & ComponentProps<"input"> &
	ComponentProps<"textarea">;

function TextInputField({ variant, ...props }: TextInputFieldProps) {
	switch (variant) {
		case "transactionDescription":
			return (
				<textarea
					className='textarea textarea-info w-full h-30 resize-none'
					{...props}
				></textarea>
			);
			break;

		default:
			return (
				<input className='input input-info w-full' type='text' {...props} />
			);
			break;
	}
}

export default TextInputField;
