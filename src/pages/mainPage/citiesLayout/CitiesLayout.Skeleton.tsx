import React from 'react';
import SimpleBar from 'simplebar-react';
import { VerticalCardSkeleton } from '../../../components';
import 'simplebar-react/dist/simplebar.min.css';
import { Map } from '../../../components/map/Map';
import { CitiesHeadSkeleton } from "./CitiesHeadSkeleton";

export const CitiesLayoutSkeleton: React.FC = () => {

	return (<div className="cities">
		<div className="cities__places-container container">
			<SimpleBar style={{
				width: 572
			}}>
				<section className="cities__places places">

					<CitiesHeadSkeleton />

					<div className="cities__places-list places__list tabs__content">
						{Array.from(new Array(8)).map((_, i) => <VerticalCardSkeleton key={i} />)}
					</div>

				</section>
			</SimpleBar>

			<div className="cities__right-section">
				<Map className="cities__map" />
			</div>
		</div>
	</div>);
};