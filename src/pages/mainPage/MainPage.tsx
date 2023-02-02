import React from 'react';
import cn from 'classnames';
import { Header, CitiesTabs } from '../../components';
import 'simplebar-react/dist/simplebar.min.css';
import { CitiesLayout } from './citiesLayout/CitiesLayout';
import { EmptyCitiesLayout } from "./emptyCitiesLayout/EmptyCitiesLayout";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffersAction } from '../../store/apiOfferActions';
import { getActiveSort, getOffers, getOffersFetchingStatus } from '../../store/offers/selectors';
import { citeName, FetchStatus, titleSep } from '../../const';
import { getActiveCity, getCitiesFetchingStatus } from '../../store/city/selectors';
import { CitiesLayoutSkeleton } from './citiesLayout/CitiesLayout.Skeleton';
import { Helmet } from "react-helmet-async";

export const MainPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const offers = useAppSelector(getOffers);
	const activeCity = useAppSelector(getActiveCity);
	const activeSort = useAppSelector(getActiveSort);
	const fetchOffersStatus = useAppSelector(getOffersFetchingStatus);
	const fetchCitiesStatus = useAppSelector(getCitiesFetchingStatus);
	const isLoading = (fetchOffersStatus === FetchStatus.IDLE || fetchOffersStatus === FetchStatus.PENDING) && FetchStatus.REJECTED !== fetchCitiesStatus;
	const isEmpty = offers.length === 0;
	const isSuccess = !isEmpty && fetchOffersStatus === FetchStatus.FULFILLED;
	const isError = fetchOffersStatus === FetchStatus.REJECTED || FetchStatus.REJECTED === fetchCitiesStatus;

	React.useEffect(() => {
		const [sortBy, order] = activeSort.split('_');
		if (activeCity) {
			dispatch(fetchOffersAction({
				sortBy,
				order,
				cityId: activeCity._id
			}));
		}
		// eslint-disable-next-line
	}, [activeSort, activeCity]);

	return (
		<div className="page page--gray page--main">
			<Helmet>
				{activeCity ?
					<title>{citeName + titleSep + activeCity.name}</title> :
					<title>{citeName}</title>
				}
			</Helmet>
			<Header />
			<main
				className={cn(
					"page__main",
					"page__main--index",
					{ "page__main--index-empty": isEmpty || fetchOffersStatus === FetchStatus.REJECTED }
				)}>
				<h1 className="visually-hidden">Cities</h1>

				<CitiesTabs />

				{isEmpty && fetchOffersStatus === FetchStatus.FULFILLED &&
					<EmptyCitiesLayout title="No places to stay available">
						<>We could not find any property available at the moment in {activeCity?.name}</>
					</EmptyCitiesLayout>}

				{isSuccess && <CitiesLayout />}

				{isLoading && <CitiesLayoutSkeleton />}

				{isError &&
					<EmptyCitiesLayout title="Something went wrong...">
						<>Try again later.</>
					</EmptyCitiesLayout>}

			</main>
		</div>
	);
};
