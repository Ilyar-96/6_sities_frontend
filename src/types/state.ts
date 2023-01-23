import { store } from "../store";
import { AuthorizationStatus, FetchStatus } from "../const";
import { IOffer, ICity } from "./offer.type";
import { IUser } from "./user.type";

export interface IUserState {
	authorizationStatus: AuthorizationStatus;
	user: IUser | null;
}

export interface IOfferState {
	pagesCount: number;
	offersCount: number;
	entities: IOffer[];
	status: FetchStatus;
	error: string | null;
}

export interface ICityState {
	entities: ICity[];
	status: FetchStatus;
	error: string | null;
	activeCity: ICity | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
