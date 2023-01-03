import React, { useState } from 'react';
import cn from "classnames";
import { RatingProps } from './Rating.type';

export const Rating: React.FC<RatingProps> = ({
	size = 'm',
	value,
	type = "static",
	isCountVisible = false,
	className,
	onChangeValue,
	...props
}) => {
	const [dynamicValue, setDynamicValue] = useState(value);

	let classBaseName;
	switch (size) {
		case 's':
			classBaseName = 'place-card';
			break;
		case 'm':
			classBaseName = 'reviews';
			break;

		default:
			classBaseName = 'property';
			break;
	}

	if (value < 0) {
		value = 0;
	}

	if (value > 5) {
		value = 5;
	}

	const width = value * 20;

	return (
		<>
			{type === "static" ?
				<div
					className={cn("rating", className, `${classBaseName}__rating`)}
					{...props}
				>
					<div className={`${classBaseName}__stars rating__stars`}>
						<span style={{ width: `${width}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
					{isCountVisible && <span className={`${classBaseName}__rating-value rating__value`}>{value}</span>}
				</div>
				:
				<div className={cn("form__rating", className)}>

					{Array.from(Array(5)).map((_, i) => (
						<React.Fragment key={i}>
							<input className="form__rating-input visually-hidden" name="rating" defaultValue={5 - i} id={`${5 - i}-stars`} type="radio" onChange={(e) => {
								if (onChangeValue) {
									onChangeValue(Number(e.target.value));
								}
							}} />
							<label htmlFor={`${5 - i}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
								<svg className="form__star-image" width={37} height={33}>
									<use xlinkHref="#icon-star" />
								</svg>
							</label>
						</React.Fragment>
					))}
				</div>}
		</>
	);
};
