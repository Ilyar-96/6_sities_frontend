import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, Register, Login, Apartment, Favorites, NotFound } from '../../pages';
import { APPRoute } from '../../const';
import { AddOffer } from '../../pages/addOffer/AddOffer';

export const AppRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={APPRoute.HOME} element={<MainPage />} />
				<Route path={APPRoute.LOGIN} element={<Login />} />
				<Route path={APPRoute.REGISTER} element={<Register />} />
				<Route path={APPRoute.APARTMENT + '/:id'} element={<Apartment />} />
				<Route path={APPRoute.FAVORITES} element={<Favorites />} />
				<Route path={APPRoute.ADD_OFFER} element={<AddOffer />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};
