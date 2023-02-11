import React from 'react';
import { ToastContainer } from "react-toastify";
import { AppRouter } from "../";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authMeAction } from '../../store/apiUserActions';
import { fetchCitiesAction } from '../../store/apiCityActions';
import { cityHashBase } from "../../const";
import { HelmetProvider } from "react-helmet-async";
import { getActiveCity } from '../../store/city/selectors';
import { getActiveSort } from '../../store/offers/selectors';
import { fetchOffersAction } from "../../store/apiOfferActions";
import { useLocation } from "react-router-dom";
import { useToggleBodyClass } from "../../hooks/useToggleBodyClass";

export const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const activeSort = useAppSelector(getActiveSort);
	const activeCity = useAppSelector(getActiveCity);
	const location = useLocation();
	useToggleBodyClass();

	React.useEffect(() => {
		const cityNameIndex = window.location.hash.indexOf(cityHashBase) + 5;
		const cityName = cityNameIndex !== -1 ? location.hash.slice(cityNameIndex) : undefined;
		dispatch(authMeAction());
		dispatch(fetchCitiesAction(cityName));
		// eslint-disable-next-line
	}, []);

	React.useEffect(() => {
		if (activeCity) {
			const [sortBy, order] = activeSort.split('_');
			dispatch(fetchOffersAction({
				sortBy,
				order,
				cityId: activeCity._id
			}));
		}
		// eslint-disable-next-line
	}, [activeCity, activeSort]);

	return (
		<HelmetProvider>
			<AppRouter />
			<ToastContainer />
		</HelmetProvider>
	);
};
