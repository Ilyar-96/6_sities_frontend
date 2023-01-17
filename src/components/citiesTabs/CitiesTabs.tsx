import React from 'react';
import cn from "classnames";
import { useAppSelector } from '../../hooks';
import { CitiesTabsProps } from './CitiesTabs.type';
import { getCities } from "../../store/city/selectors";

export const CitiesTabs: React.FC<CitiesTabsProps> = ({ onClick, activeCity }) => {
	const cities = useAppSelector(getCities);

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
