import React from 'react';
import cn from 'classnames';
import { SortProps, SortTypes } from './Sort.type';

export const sortItems = [
	{ title: "Popular", dataLabel: SortTypes.POPULAR },
	{ title: "Price: low to high", dataLabel: SortTypes.PRICE_ASC },
	{ title: "Price: high to low", dataLabel: SortTypes.PRICE_DESC },
	{ title: "Top rated first", dataLabel: SortTypes.RATE },
];

export const Sort: React.FC<SortProps> = ({
	active = SortTypes.POPULAR,
	onSortChange,
	className,
	...props
}) => {
	const [isOpened, setIsOpened] = React.useState<boolean>(false);
	const sortLabel = sortItems.filter(
		item => item.dataLabel === active
	)[0]?.title;

	const sortLabelClickHandler = () => {
		setIsOpened(prevState => !prevState);
	};

	const sortItemClickHandler = (value: SortTypes) => {
		onSortChange(value);
		setIsOpened(false);
	};

	return (
		<div className="places__sorting">
			<span className="places__sorting-caption">Sort by </span>
			<span
				className="places__sorting-type"
				tabIndex={0}
				onClick={sortLabelClickHandler}
			>
				{sortLabel}
				<svg className="places__sorting-arrow" width={7} height={4}>
					<use xlinkHref="#icon-arrow-select" />
				</svg>
			</span>
			<ul className={cn(
				"sort__options",
				"sort__options--custom",
				{ "sort__options--opened": isOpened }
			)}
				{...props}
			>
				{sortItems.map(item => (
					<li
						key={item.dataLabel}
						className={cn("sort__option", { "sort__option--active": active === item.dataLabel })}
						tabIndex={0}
						onClick={() => sortItemClickHandler(item.dataLabel)}
					>
						{item.title}
					</li>
				))}
			</ul>
		</div>
	);
};