import React from 'react';
import cn from "classnames";
import { useAppSelector, useAppDispatch } from '../../hooks';
import { CitiesTabsProps } from './CitiesTabs.type';
import { getActiveCity, getCities } from "../../store/city/selectors";
import { changeActiveCity } from "../../store/city/city";
import { ICity } from '../../types/offer.type';

export const CitiesTabs: React.FC<CitiesTabsProps> = () => {
	const dispatch = useAppDispatch();
	const activeCity = useAppSelector(getActiveCity);
	const cities = useAppSelector(getCities);

	const onClick = (city: ICity) => {
		dispatch(changeActiveCity(city));
	};

	return (
		<div className="tabs">
			<section className="locations container">
				<ul className="locations__list tabs__list">
					{cities.map(city => (
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
					))}
				</ul>
			</section>
		</div>
	);
};
