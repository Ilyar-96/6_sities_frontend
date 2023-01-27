
import React, { ForwardedRef } from 'react';
import { InputRadioProps } from './InputRadio.type';
import nextId from "react-id-generator";

export const InputRadio = React.forwardRef(({ errorMessage, label, ...props }: InputRadioProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	const id = nextId();

	return (
		<>
			<input
				id={id}
				ref={ref}
				className="form__radio"
				{...props}
				type="radio"
			/>
			<label htmlFor={id} className="form__radio-label">
				{label}
			</label>
			{errorMessage && <div className="form__error">
				<>{errorMessage}</>
			</div>}
		</>
	);
});
