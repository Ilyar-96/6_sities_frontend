import React from 'react';
import { Routes, Route } from "react-router-dom";
import { MainPage, Register, Login, Apartment, Favorites, NotFound } from '../../pages';
import { AppRoute } from '../../const';
import { CreateOffer } from '../../pages/createOffer/CreateOffer';

export const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route path={AppRoute.HOME} element={<MainPage />} />
			<Route path={AppRoute.LOGIN} element={<Login />} />
			<Route path={AppRoute.REGISTER} element={<Register />} />
			<Route path={AppRoute.APARTMENT + '/:id'} element={<Apartment />} />
			<Route path={AppRoute.FAVORITES} element={<Favorites />} />
			<Route path={AppRoute.ADD_OFFER} element={<CreateOffer />} />
			<Route path={AppRoute.ADD_OFFER + '/:id'} element={<CreateOffer />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};
