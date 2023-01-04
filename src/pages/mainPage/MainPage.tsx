import React from 'react';
import cn from 'classnames';
import { Header } from '../../components';
import { offers } from '../../mockData';
import { SortTypes } from "../../components/sort/Sort.type";
import { ICity, IOffer } from '../../types/offer.type';
import 'simplebar-react/dist/simplebar.min.css';
import { CitiesLayout } from './citiesLayout/CitiesLayout';
import { EmptyCitiesLayout } from "./emptyCitiesLayout/EmptyCitiesLayout";

const cities: ICity[] = [
	{ name: "Paris", location: { latitude: 50.938361, longitude: 6.959974, zoom: 13, } },
	{ name: "Cologne", location: { latitude: 50.938361, longitude: 6.959974, zoom: 13, } },
	{ name: "Brussels", location: { latitude: 50.938361, longitude: 6.959974, zoom: 13, } },
	{ name: "Amsterdam", location: { latitude: 50.938361, longitude: 6.959974, zoom: 13, } },
	{ name: "Hamburg", location: { latitude: 50.938361, longitude: 6.959974, zoom: 13, } },
	{ name: "Dusseldorf", location: { latitude: 50.938361, longitude: 6.959974, zoom: 13, } },
	{ name: "Berlin", location: { latitude: 50.938361, longitude: 6.959974, zoom: 13, } },
];

export const MainPage: React.FC = () => {
	const [activeCity, setActiveCity] = React.useState<ICity>(cities[0]);
	const [activeSort, setActiveSort] = React.useState<SortTypes>(SortTypes.POPULAR);
	const filteredOffers = offers
		.filter(offer => offer.city.name === activeCity.name)
		.sort(offerCompare);
	const isEmpty = filteredOffers.length === 0;

	const sortChangeHandler = (value: SortTypes) => {
		setActiveSort(value);
	};

	function offerCompare(a: IOffer, b: IOffer) {
		switch (activeSort) {
			case SortTypes.PRICE_ASC:
				return a.price - b.price;
			case SortTypes.PRICE_DESC:
				return b.price - a.price;
			case SortTypes.RATE:
				return b.rating - a.rating;
			default:
				return 1;
		}
	};

	const cityItemClickHandler = (city: ICity) => {
		setActiveCity(city);
	};

	return (
		<div className="page page--gray page--main">
			<Header />
			<main
				className={cn(
					"page__main",
					"page__main--index",
					{ "page__main--index-empty": isEmpty }
				)}>
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<ul className="locations__list tabs__list">
							{cities.map(city => (
								<li className="locations__item" key={city.name}>
									<button
										className={cn(
											"locations__item-link",
											"tabs__item",
											{ "tabs__item--active": activeCity.name === city.name }
										)}
										onClick={() => cityItemClickHandler(city)}
									>
										<span>{city.name}</span>
									</button>
								</li>
							))}
						</ul>
					</section>
				</div>


				{!isEmpty ?
					<CitiesLayout
						sortType={activeSort}
						city={activeCity}
						offers={filteredOffers}
						sortChangeHandler={sortChangeHandler}
					/> :
					<EmptyCitiesLayout />}
			</main>
		</div>
	);
};
