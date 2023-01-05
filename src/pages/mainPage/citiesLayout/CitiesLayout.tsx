import React from 'react';
import SimpleBar from 'simplebar-react';
import { ApartmentCard, Sort } from '../../../components';
import 'simplebar-react/dist/simplebar.min.css';
import { CitiesLayoutProps } from './CitiesLayout.type';
import { Map } from '../../../components/map/Map';
import { useAppSelector } from '../../../hooks';
import { getOffersFetchingStatus } from '../../../store/offers/selectors';
import { FetchStatus } from '../../../const';
const pluralize = require('pluralize');

export const CitiesLayout: React.FC<CitiesLayoutProps> = ({
	city,
	offers,
	sortChangeHandler,
	sortType
}) => {
	const status = useAppSelector(getOffersFetchingStatus);

	return (<div className="cities">
		<div className="cities__places-container container">
			<SimpleBar style={{
				width: 572
			}}>
				<section className="cities__places places">
					{status === FetchStatus.FULFILLED &&
						<>
							<h2 className="visually-hidden">Places</h2>
							<b className="places__found">
								{offers.length} {pluralize("places", offers.length)} to stay in {city.name}
							</b>


							<Sort active={sortType} onSortChange={sortChangeHandler} />

							<div className="cities__places-list places__list tabs__content">
								{offers.map((offer) => <ApartmentCard key={offer.id} className="cities__card" data={offer} />)}
							</div>
						</>
					}

					{(status === FetchStatus.IDLE || status === FetchStatus.PENDING) && (
						<h2>Loading...</h2>
					)}

				</section>
			</SimpleBar>

			<div className="cities__right-section">
				<Map className="cities__map" />
			</div>
		</div>
	</div>);
};