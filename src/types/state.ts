import { store } from "../store";
import { AuthorizationStatus, FetchStatus } from "../const";
import { IUser, IOffer, ICity } from "./offer.type";

export interface ICurrentUser extends Omit<IUser, "isPro"> {
	favorites: string[];
	login: string;
}

export interface IUserState {
	authorizationStatus: AuthorizationStatus;
	user: ICurrentUser;
}

export interface IOfferState {
	entities: IOffer[];
	cities: ICity[];
	offersStatus: FetchStatus;
	citiesStatus: FetchStatus;
	error: string | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
