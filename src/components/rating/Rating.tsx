import React from 'react';
import cn from "classnames";
import { RatingProps } from './Rating.type';

export const Rating: React.FC<RatingProps> = ({
	ratingSize: size = 'm',
	defaultValue,
	ratingType: type = "static",
	isCountVisible = false,
	className,
	getValue,
}) => {
	const [value, setValue] = React.useState<number>(defaultValue);

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

	React.useEffect(() => {
		if (value < 0) {
			setValue(0);
		}

		if (value > 5) {
			setValue(5);
		}

		onChange();
	}, [value]);

	const onChange = () => {
		if (getValue) {
			getValue(value);
		}
	};

	const onClick = (val: number) => {
		setValue(val);
	};

	return (
		<>
			{type === "static" ?
				<div className={cn("rating", className, `${classBaseName}__rating`)}>
					<div className={`${classBaseName}__stars rating__stars`}>
						<span style={{ width: `${defaultValue * 20}%` }} />
						<span className="visually-hidden">Rating</span>
					</div>
					{isCountVisible &&
						<span className={`${classBaseName}__rating-value rating__value`} >
							{defaultValue}
						</span>}
				</div>
				:
				<div className={cn("form__rating", className)}>

					{Array.from(Array(5)).map((_, i) => (
						<React.Fragment key={i}>
							<input
								className="form__rating-input visually-hidden"
								name="rating"
								defaultValue={5 - i}
								id={`${5 - i}-stars`}
								type="radio"
								defaultChecked={value === 5 - i ? true : false}
							/>
							<label htmlFor={`${5 - i}-stars`}
								className="reviews__rating-label form__rating-label"
								title="perfect"
								onClick={() => onClick(5 - i)}
							>
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
