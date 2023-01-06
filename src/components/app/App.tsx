import React from 'react';
import { ToastContainer } from "react-toastify";
import { AppRouter } from "../";
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
	return (
		<>
			<AppRouter />
			<ToastContainer />
		</>
	);
};
