import { store } from "../store";
import { AuthorizationStatus, FetchStatus } from "../const";
import { IUser, IOffer, ICity } from "./offer.type";

export interface IUserState {
	authorizationStatus: AuthorizationStatus;
	user: IUser;
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
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
