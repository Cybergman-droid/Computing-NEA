import { type ComponentProps } from "react";
type ButtonFieldProps = ComponentProps<"button">;

// Button to open the transaction upload form
function SingleTransactionUploadFormButton({
	onClick,
	...props
}: ButtonFieldProps) {
	return (
		<button
			{...props}
			type='button'
			onClick={(event) => onClick?.(event)}
			className='btn btn-outline btn-info'
		>
			Upload a single Transaction
		</button>
	);
}
export default SingleTransactionUploadFormButton;
