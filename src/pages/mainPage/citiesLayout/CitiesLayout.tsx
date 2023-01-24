import React from 'react';
import SimpleBar from 'simplebar-react';
import { ApartmentCard, Sort } from '../../../components';
import 'simplebar-react/dist/simplebar.min.css';
import { MapSection } from '../../../components/map/Map';
import { getActiveSort, getOffersOffersCount, getOffers } from '../../../store/offers/selectors';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getActiveCity } from '../../../store/city/selectors';
import { changeActiveSort } from "../../../store/offers/offer";
import { SortTypes } from "../../../components/sort/Sort.type";
const pluralize = require('pluralize');

export const CitiesLayout: React.FC = () => {
	const dispatch = useAppDispatch();
	const offersCount = useAppSelector(getOffersOffersCount);
	const activeSort = useAppSelector(getActiveSort);
	const city = useAppSelector(getActiveCity);
	const offers = useAppSelector(getOffers);

	const onSortChange = (sort: SortTypes) => {
		dispatch(changeActiveSort(sort));
	};

	if (!city) {
		return <h1>Loading</h1>;
	}

	return (<div className="cities">
		<div className="cities__places-container container">
			<SimpleBar style={{
				width: 572
			}}>
				<section className="cities__places places">

					<h2 className="visually-hidden">Places</h2>
					<b className="places__found">
						{offersCount} {pluralize("places", offersCount)} to stay in {city?.name}
					</b>

					<Sort active={activeSort} onSortChange={onSortChange} />

					<div className="cities__places-list places__list tabs__content">
						{offers.map((offer) => <ApartmentCard key={offer._id} className="cities__card" data={offer} />)}
					</div>

				</section>
			</SimpleBar>

			<div className="cities__right-section">
				<MapSection className="cities__map" centralLocation={city.location} offers={offers} />
			</div>
		</div>
	</div>);
};