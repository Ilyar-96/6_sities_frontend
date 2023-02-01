import React from 'react';
import cn from 'classnames';
import { SortProps, SortTypes } from './Sort.type';
import { useClickOutside } from "../../hooks/useClickOutside";

export const sortItems = [
	{ title: "Date", dataLabel: SortTypes.DATE },
	{ title: "Price: low to high", dataLabel: SortTypes.PRICE_ASC },
	{ title: "Price: high to low", dataLabel: SortTypes.PRICE_DESC },
	{ title: "Top rated first", dataLabel: SortTypes.RATE },
];

export const Sort: React.FC<SortProps> = ({
	active = SortTypes.DATE,
	onSortChange,
	className,
	...props
}) => {
	const [isOpened, setIsOpened] = React.useState<boolean>(false);
	const popupRef = React.useRef<HTMLDivElement>(null);
	const sortLabel = sortItems.filter(
		item => item.dataLabel === active
	)[0]?.title;

	useClickOutside(popupRef, () => setIsOpened(false));

	const sortLabelClickHandler = () => {
		setIsOpened(prevState => !prevState);
	};

	const sortItemClickHandler = (value: SortTypes) => {
		onSortChange(value);
		setIsOpened(false);
	};

	return (
		<div ref={popupRef} className="places__sorting">
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
			<ul
				className={cn(
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
