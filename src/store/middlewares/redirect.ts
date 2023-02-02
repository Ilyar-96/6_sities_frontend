import { PayloadAction } from "@reduxjs/toolkit";
import { Middleware } from "redux";
import { browserHistory } from "../../utils";
import { rootReducer } from "../RootReducer";

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
	(_store) => (next) => (action: PayloadAction<string>) => {
		if (action.type === "redirectToRoute") {
			console.log(browserHistory);
			browserHistory.push(action.payload);
		}

		return next(action);
	};
