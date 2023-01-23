import React from 'react';
import cn from 'classnames';
import { Header, CitiesTabs } from '../../components';
import { SortTypes } from "../../components/sort/Sort.type";
import { ICity } from '../../types/offer.type';
import 'simplebar-react/dist/simplebar.min.css';
import { CitiesLayout } from './citiesLayout/CitiesLayout';
import { EmptyCitiesLayout } from "./emptyCitiesLayout/EmptyCitiesLayout";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffersAction } from '../../store/apiActions';
import { getOffers, getOffersFetchingStatus } from '../../store/offers/selectors';
import { FetchStatus, limits } from '../../const';
import { getActiveCity, getCities, getCitiesFetchingStatus } from '../../store/city/selectors';
import { CitiesLayoutSkeleton } from './citiesLayout/CitiesLayout.Skeleton';

export const MainPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const offers = useAppSelector(getOffers);
	const activeCity = useAppSelector(getActiveCity);
	const fetchOffersStatus = useAppSelector(getOffersFetchingStatus);
	const fetchCitiesStatus = useAppSelector(getCitiesFetchingStatus);
	const isLoading = fetchOffersStatus === FetchStatus.IDLE || fetchOffersStatus === FetchStatus.PENDING;
	const [activeSort, setActiveSort] = React.useState<SortTypes>(SortTypes.DATE);
	const isEmpty = offers.length === 0;


	React.useEffect(() => {
		const [sortBy, order] = activeSort.split('_');
		if (activeCity) {
			dispatch(fetchOffersAction({
				page: 1,
				limit: limits.offersPerPage,
				sortBy,
				order,
				cityId: activeCity._id
			}));
		}
	}, [activeSort, activeCity]);

	const sortChangeHandler = (value: SortTypes) => {
		setActiveSort(value);
	};

	return (
		<div className="page page--gray page--main">
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
				{!isEmpty && fetchOffersStatus === FetchStatus.FULFILLED && <CitiesLayout
					sortType={activeSort}
					offers={offers}
					sortChangeHandler={sortChangeHandler}
				/>}
				{isLoading && FetchStatus.REJECTED !== fetchCitiesStatus && <CitiesLayoutSkeleton />}
				{(fetchOffersStatus === FetchStatus.REJECTED || FetchStatus.REJECTED === fetchCitiesStatus) &&
					<EmptyCitiesLayout title="Something went wrong...">
						<>Try again later.</>
					</EmptyCitiesLayout>}
			</main>
		</div>
	);
};
