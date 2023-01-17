import { RootState } from "../../types/state";
import { NameSpace } from "../../const";

export const getOffers = (state: RootState) => state[NameSpace.OFFER].entities;
export const getOffersPageCount = (state: RootState) =>
	state[NameSpace.OFFER].pagesCount;
export const getOffersOffersCount = (state: RootState) =>
	state[NameSpace.OFFER].offersCount;
export const getOffersFetchingStatus = (state: RootState) =>
	state[NameSpace.OFFER].status;
export const getOffersErrorMessage = (state: RootState) =>
	state[NameSpace.OFFER].error;
