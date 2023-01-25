
import React, { ForwardedRef } from 'react';
import { TextareaProps } from './Textarea.type';

export const Textarea = React.forwardRef(({ errorMessage, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
		<div className="form__input-wrapper">
			<label className="visually-hidden">{props.placeholder}</label>
			<textarea
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
