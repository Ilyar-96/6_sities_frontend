import { RootState } from "../../types/state";
import { NameSpace } from "../../const";

export const getOffers = (state: RootState) => state[NameSpace.OFFER].entities;
export const getCities = (state: RootState) => state[NameSpace.OFFER].cities;
export const getOffersFetchingStatus = (state: RootState) =>
	state[NameSpace.OFFER].offersStatus;
export const getCitiesFetchingStatus = (state: RootState) =>
	state[NameSpace.OFFER].citiesStatus;
export const getErrorMessage = (state: RootState) =>
	state[NameSpace.OFFER].error;
