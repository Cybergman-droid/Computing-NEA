import { type ComponentProps } from "react";

type DateInputFieldProps = {} & ComponentProps<"input">;

function DateInputField({ ...props }: DateInputFieldProps) {
	return <input {...props} type='date' className='input w-full' />;
}
export default DateInputField;
