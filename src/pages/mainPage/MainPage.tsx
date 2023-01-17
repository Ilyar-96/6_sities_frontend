import React from 'react';
import cn from 'classnames';
import { Header, CitiesTabs } from '../../components';
import { SortTypes } from "../../components/sort/Sort.type";
import { ICity, IOffer } from '../../types/offer.type';
import 'simplebar-react/dist/simplebar.min.css';
import { CitiesLayout } from './citiesLayout/CitiesLayout';
import { EmptyCitiesLayout } from "./emptyCitiesLayout/EmptyCitiesLayout";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOffersAction } from '../../store/apiActions';
import { getOffers, getCities, getOffersFetchingStatus } from '../../store/offers/selectors';
import { FetchStatus, limits } from '../../const';

export const MainPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const offers = useAppSelector(getOffers);
	const cities = useAppSelector(getCities);
	const status = useAppSelector(getOffersFetchingStatus);

	const [activeCity, setActiveCity] = React.useState<ICity>(cities[3]);
	const [activeSort, setActiveSort] = React.useState<SortTypes>(SortTypes.DATE);
	const filteredOffers = offers
		.filter(offer => offer.city.name === activeCity.name);
	const isEmpty = filteredOffers.length === 0;

	React.useEffect(() => {
		const [sortBy, order] = activeSort.split('_');
		dispatch(fetchOffersAction({
			page: 1,
			limit: limits.offersPerPage,
			sortBy,
			order,
			cityId: "63c5379a308caae6c7f56d51"
		}));
	}, [activeSort]);

	const sortChangeHandler = (value: SortTypes) => {
		setActiveSort(value);
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
					{ "page__main--index-empty": isEmpty || status === FetchStatus.REJECTED }
				)}>
				<h1 className="visually-hidden">Cities</h1>

				<CitiesTabs activeCity={activeCity} onClick={cityItemClickHandler} />

				{isEmpty && status === FetchStatus.FULFILLED &&
					<EmptyCitiesLayout title="No places to stay available">
						<>We could not find any property available at the moment in {activeCity.name}</>
					</EmptyCitiesLayout>}
				{status !== FetchStatus.REJECTED && <CitiesLayout
					sortType={activeSort}
					city={activeCity}
					offers={filteredOffers}
					sortChangeHandler={sortChangeHandler}
				/>}
				{status === FetchStatus.REJECTED &&
					<EmptyCitiesLayout title="Something went wrong...">
						<>Try again later.</>
					</EmptyCitiesLayout>}
			</main>
		</div>
	);
};
