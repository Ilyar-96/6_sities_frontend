import {
	ICity,
	IOfferData,
	IOfferFetchParams,
	IUser,
} from "../types/offer.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../types/state";
import { AxiosInstance } from "axios";
import { APIRoute, NameSpace } from "../const";

export const fetchOffersAction = createAsyncThunk<
	IOfferData,
	IOfferFetchParams,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(
	`${NameSpace.OFFER}/fetchOffers`,
	async (params, { dispatch, extra: api }) => {
		const { data } = await api.get<IOfferData>(APIRoute.OFFERS, { params });
		return data;
	}
);

export const fetchUserAction = createAsyncThunk<
	IUser,
	undefined,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(`${NameSpace.USER}/fetchUser`, async (params, { dispatch, extra: api }) => {
	const { data } = await api.get<IUser>(APIRoute.USER, { params });
	return data;
});

export const fetchCitiesAction = createAsyncThunk<
	ICity[],
	undefined,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(`${NameSpace.CITY}/fetchCities`, async (_, { dispatch, extra: api }) => {
	const { data } = await api.get<ICity[]>(APIRoute.CITY);
	return data;
});
