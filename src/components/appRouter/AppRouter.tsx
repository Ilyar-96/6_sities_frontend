import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, Register, Login, Apartment, Favorites } from '../../pages';
import { APPRoute } from '../../const';

export const AppRouter: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={APPRoute.MAIN} element={<MainPage />} />
				<Route path={APPRoute.LOGIN} element={<Login />} />
				<Route path={APPRoute.REGISTER} element={<Register />} />
				<Route path={APPRoute.APARTMENT + '/:id'} element={<Apartment />} />
				<Route path={APPRoute.FAVORITES} element={<Favorites />} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
		</BrowserRouter>
	);
};
