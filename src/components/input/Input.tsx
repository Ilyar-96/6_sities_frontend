
import React, { ForwardedRef } from 'react';
import { InputProps } from './Input.type';

export const Input = React.forwardRef(({ errorMessage, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
		<div className="form__input-wrapper">
			<label className="visually-hidden">{props.placeholder}</label>
			<input
				ref={ref}
				className="form__input"
				{...props}
			/>
			{errorMessage && <div className="form__error">
				<>{errorMessage}</>
			</div>}
		</div>
	);
});
