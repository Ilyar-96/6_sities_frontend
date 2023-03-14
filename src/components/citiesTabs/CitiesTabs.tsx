import React from 'react';
import { useAppSelector } from '../../hooks';
import { CitiesTabsProps } from './CitiesTabs.type';
import { getCities, getCitiesFetchingStatus } from '../../store/city/selectors';
import { FetchStatus, matchMediaMobileQuery } from '../../const';
import { CitiesTabsSkeleton } from './CitiesTabsSkeleton';
import { useMedia } from '../../hooks/useMedia';
import { TabItem } from "..";

export const CitiesTabs: React.FC<CitiesTabsProps> = () => {
	const cities = useAppSelector(getCities);
	const fetchingStatus = useAppSelector(getCitiesFetchingStatus);
	const isLoading = fetchingStatus === FetchStatus.PENDING;
	const isError = fetchingStatus === FetchStatus.REJECTED;
	const isMobile = useMedia(matchMediaMobileQuery);

	return (

		<>
			{!isMobile && <div className="tabs">
				<section className="locations container">
					<ul className="locations__list locations__list--mob">
						{!isLoading ?
							cities.map((city) => (<TabItem key={city._id} city={city} />)) :
							<CitiesTabsSkeleton />}
						{isError &&
							<h3>Oops! Cities were not loaded.</h3>}
					</ul>
				</section>
			</div>}
		</>
	);
};
