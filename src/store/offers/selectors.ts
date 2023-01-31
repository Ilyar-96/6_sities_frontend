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
export const getActiveSort = (state: RootState) =>
	state[NameSpace.OFFER].activeSort;

export const getSingleOffer = (state: RootState) =>
	state[NameSpace.OFFER].singleOffer;
export const getSingleOfferFetchingStatus = (state: RootState) =>
	state[NameSpace.OFFER].singleOfferStatus;
export const getSingleOfferErrorMessage = (state: RootState) =>
	state[NameSpace.OFFER].singleOfferError;
export const getCommentStatus = (state: RootState) =>
	state[NameSpace.OFFER].commentStatus;
