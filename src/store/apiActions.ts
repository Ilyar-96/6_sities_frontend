import { IOffer } from "../types/offer.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState, IOfferState } from "../types/state";
import { AxiosInstance } from "axios";
import { APIRoute, NameSpace } from "../const";

export const fetchOffersAction = createAsyncThunk<
	IOffer[],
	undefined,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(`${NameSpace.OFFER}/fetchOffers`, async (_arg, { dispatch, extra: api }) => {
	const { data } = await api.get<IOffer[]>(APIRoute.OFFERS);
	return data;
});
