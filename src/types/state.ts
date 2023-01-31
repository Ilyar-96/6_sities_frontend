import { store } from "../store";
import { AuthorizationStatus, FetchStatus } from "../const";
import { IOffer, ICity } from "./offer.type";
import { IUser } from "./user.type";
import { SortTypes } from "../components/sort/Sort.type";
import { AxiosInstance } from "axios";

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
	singleOffer: IOffer | null;
	singleOfferStatus: FetchStatus;
	singleOfferError: string | null;
	commentStatus: FetchStatus;
}

export interface ICityState {
	entities: ICity[];
	status: FetchStatus;
	error: string | null;
	activeCity: ICity | null;
}

export type AsyncThunkParamsType = {
	dispatch: AppDispatch;
	state: RootState;
	extra: AxiosInstance;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
