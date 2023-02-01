import { RootState } from "../../types/state";
import { NameSpace, AuthorizationStatus, FetchStatus } from "../../const";
import { IUser } from "../../types/user.type";
import { IOffer } from "../../types/offer.type";

export const getAuthStatus = (state: RootState): AuthorizationStatus =>
	state[NameSpace.USER].authorizationStatus;
export const getIsAuth = (state: RootState): boolean =>
	state[NameSpace.USER].authorizationStatus === AuthorizationStatus.AUTH;
export const getAuthCheckedStatus = (state: RootState): boolean => {
	return (
		state[NameSpace.USER].authorizationStatus !== AuthorizationStatus.UNKNOWN &&
		state[NameSpace.USER].authorizationStatus !== AuthorizationStatus.PENDING
	);
};

export const getUserData = (state: RootState): IUser | null =>
	state[NameSpace.USER].user;
export const getIsHost = (state: RootState): boolean =>
	Boolean(state[NameSpace.USER].user?.role.some((r) => r === "HOST"));
export const getFavorites = (state: RootState): IOffer[] => {
	if (state[NameSpace.USER].user) {
		return state[NameSpace.USER].user.favorites;
	}
	return [];
};
export const getFavoritesStatus = (state: RootState): FetchStatus =>
	state[NameSpace.USER].addingFavoritesStatus;
