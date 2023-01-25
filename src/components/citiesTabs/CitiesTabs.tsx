import React from 'react';
import cn from "classnames";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { CitiesTabsProps } from './CitiesTabs.type';
import { getActiveCity, getCities, getCitiesFetchingStatus } from '../../store/city/selectors';
import { changeActiveCity } from "../../store/city/city";
import { ICity } from '../../types/offer.type';
import { useNavigate } from "react-router-dom";
import { APPRoute, cityHashBase, FetchStatus } from '../../const';
import { CitiesTabsSkeleton } from './CitiesTabsSkeleton';

export const CitiesTabs: React.FC<CitiesTabsProps> = () => {
	const dispatch = useAppDispatch();
	const activeCity = useAppSelector(getActiveCity);
	const cities = useAppSelector(getCities);
	const fetchingStatus = useAppSelector(getCitiesFetchingStatus);
	const navigate = useNavigate();
	const isLoading = fetchingStatus === FetchStatus.PENDING;
	const isError = fetchingStatus === FetchStatus.REJECTED;

	const onClick = (city: ICity) => {
		navigate(APPRoute.MAIN + "#" + cityHashBase + city.name);
		navigate(APPRoute.MAIN + "#" + cityHashBase + city.name);
		dispatch(changeActiveCity(city));
	};

	return (
		<div className="tabs">
			<section className="locations container">
				<ul className="locations__list tabs__list">
					{!isLoading ? cities.map(city => (
						<li className="locations__item" key={city.name}>
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
					)) : <CitiesTabsSkeleton />}

					{isError &&
						<h3>Oops! Cities were not loaded.</h3>}
				</ul>
			</section>
		</div>
	);
};
