import React from 'react';
import { ToastContainer } from "react-toastify";
import { AppRouter } from "../";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../../hooks';
import { authMeAction } from '../../store/apiUserActions';
import { fetchCitiesAction } from '../../store/apiCityActions';
import { cityHashBase } from "../../const";
import { HelmetProvider } from "react-helmet-async";

export const App: React.FC = () => {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		const cityNameIndex = window.location.hash.indexOf(cityHashBase) + 5;
		const cityName = cityNameIndex !== -1 ? window.location.hash.slice(cityNameIndex) : undefined;

		dispatch(authMeAction());
		dispatch(fetchCitiesAction(cityName));
		// eslint-disable-next-line
	}, []);

	return (
		<HelmetProvider>
			<AppRouter />
			<ToastContainer />
		</HelmetProvider>
	);
};
