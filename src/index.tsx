import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { App, HistoryRouter } from './components';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import './index.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { browserHistory } from "./utils";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	// <React.StrictMode>
	// </React.StrictMode>
	<HistoryRouter history={browserHistory}>
		<Provider store={store}>
			<App />
		</Provider>
	</HistoryRouter>
);

reportWebVitals();
