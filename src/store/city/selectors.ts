import { NameSpace } from "../../const";
import { RootState } from "../../types/state";

export const getCities = (state: RootState) => state[NameSpace.CITY].entities;
export const getCitiesFetchingStatus = (state: RootState) =>
	state[NameSpace.CITY].status;
export const getCitiesErrorMessage = (state: RootState) =>
	state[NameSpace.CITY].error;
export const getActiveCity = (state: RootState) =>
	state[NameSpace.CITY].activeCity;
export const getIsMobilePopupOpen = (state: RootState) =>
	state[NameSpace.CITY].isMobilePopupOpen;
