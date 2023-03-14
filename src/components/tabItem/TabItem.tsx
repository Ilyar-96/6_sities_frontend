import { FC } from 'react';
import cn from "classnames";
import { TabItemProps } from "./TabItem.type";
import { useNavigate } from "react-router-dom";
import { AppRoute, cityHashBase } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { changeActiveCity, toggleMobilePopup } from "../../store/city/city";
import { getActiveCity, getisSmallPopupOpen } from "../../store/city/selectors";
import { ICity } from "../../types/offer.type";

export const TabItem: FC<TabItemProps> = ({ city }) => {
	const dispatch = useAppDispatch();
	const activeCity = useAppSelector(getActiveCity);
	const isOpen = useAppSelector(getisSmallPopupOpen);
	const navigate = useNavigate();

	const onClick = (city: ICity) => {
		navigate(AppRoute.HOME + "#" + cityHashBase + city.name);
		dispatch(changeActiveCity(city));
		isOpen && dispatch(toggleMobilePopup());
	};


	return (
		<li className="locations__item">
			<button
				className={cn(
					"locations__item-link",
					"tabs__item",
					{ "tabs__item--active": activeCity?.name === city?.name }
				)}
				onClick={() => onClick(city)}
			>
				<span>{city.name}</span>
			</button>
		</li>
	);
};
