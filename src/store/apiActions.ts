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
import { ILoginData } from "../services/authService";
import { getToken, saveToken, Token } from "../services/token";

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

export const fetchLoginAction = createAsyncThunk<
	IUser,
	ILoginData,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(
	`${NameSpace.USER}/fetchLogin`,
	async (loginData, { dispatch, extra: api }) => {
		try {
			const { data } = await api.post<IUser>(APIRoute.LOGIN, loginData);
			if (data.token) {
				saveToken(data.token);
			}
			return data;
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(err.message);
			}
			throw new Error("Something went wrong...");
		}
	}
);

export const fetchAuthMeAction = createAsyncThunk<
	IUser,
	undefined,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(`${NameSpace.USER}/fetchAuthMe`, async (_, { dispatch, extra: api }) => {
	try {
		const { data } = await api.get<IUser>(APIRoute.AUTH_ME);
		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
		throw new Error("Something went wrong...");
	}
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
