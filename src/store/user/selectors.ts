import { RootState } from "../../types/state";
import { NameSpace, AuthorizationStatus } from "../../const";
import { IUser } from "../../types/offer.type";

export const getAuthStatus = (state: RootState): AuthorizationStatus =>
	state[NameSpace.USER].authorizationStatus;
export const getIsAuth = (state: RootState): boolean =>
	state[NameSpace.USER].authorizationStatus === AuthorizationStatus.AUTH;
export const getAuthCheckedStatus = (state: RootState): boolean =>
	state[NameSpace.USER].authorizationStatus !== AuthorizationStatus.UNKNOWN;
export const getUserData = (state: RootState): IUser =>
	state[NameSpace.USER].user;
