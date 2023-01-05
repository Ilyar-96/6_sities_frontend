import { store } from "../store";
import { AuthorizationStatus } from "../const";
import { IUser } from "./offer.type";

export interface ICurrentUser extends Omit<IUser, "isPro"> {
	favorites: string[];
	login: string;
}

export interface UserProcess {
	authorizationStatus: AuthorizationStatus;
	user: ICurrentUser;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
