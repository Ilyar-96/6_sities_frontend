
import React, { ForwardedRef } from 'react';
import cn from 'classnames';
import { TextareaProps } from './Textarea.type';

export const Textarea = React.forwardRef(({ errorMessage, label, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
	return (
		<div className="form__input-wrapper">
			<label className={cn(
				{ "visually-hidden": !label },
				{ "form__label": label }
			)}>{label ? label : props.placeholder}</label>
			<textarea
				ref={ref}
				className={cn("form__textarea", className)}
				{...props}
			/>
			{errorMessage && <div className="form__error">
				<>{errorMessage}</>
			</div>}
		</div>
	);
});
