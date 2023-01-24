import { store } from "../store";
import { AuthorizationStatus, FetchStatus } from "../const";
import { IOffer, ICity } from "./offer.type";
import { IUser } from "./user.type";
import { SortTypes } from "../components/sort/Sort.type";

export interface IUserState {
	authorizationStatus: AuthorizationStatus;
	user: IUser | null;
	addingFavoritesStatus: FetchStatus;
}

export interface IOfferState {
	pagesCount: number;
	offersCount: number;
	entities: IOffer[];
	status: FetchStatus;
	error: string | null;
	activeSort: SortTypes;
}

export interface ICityState {
	entities: ICity[];
	status: FetchStatus;
	error: string | null;
	activeCity: ICity | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
