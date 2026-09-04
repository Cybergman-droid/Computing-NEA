import { type ComponentProps } from "react";
type ButtonFieldProps = {} & ComponentProps<"button">;
// Submit button dispalyed in the form to submit it
function SubmitButton({ ...props }: ButtonFieldProps) {
	return (
		<button {...props} type='submit' className='btn btn-outline btn-success'>
			Submit
		</button>
	);
}
export default SubmitButton;
