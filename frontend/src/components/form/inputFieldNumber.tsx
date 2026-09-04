import { type ComponentProps } from "react";
type NumberInputFieldProps = {} & ComponentProps<"input">;

function NumberInputField({ ...props }: NumberInputFieldProps) {
	return (
		<input className='input input-warning w-full' {...props} type='number' />
	);
}

export default NumberInputField;
