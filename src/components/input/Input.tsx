
import React, { ForwardedRef } from 'react';
import { InputProps } from './Input.type';
import cn from 'classnames';

export const Input = React.forwardRef(({ errorMessage, label, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
	return (
		<div className="form__input-wrapper">
			<label className={cn(
				{ "visually-hidden": !label },
				{ "form__label": label }
			)}
			>{label ? label : props.placeholder}</label>
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
