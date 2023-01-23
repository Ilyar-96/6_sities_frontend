import {
	ICity,
	IOfferData,
	IOfferFetchParams,
	IReview,
} from "../types/offer.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../types/state";
import { AxiosInstance } from "axios";
import { APIRoute, NameSpace } from "../const";
import { saveToken } from "../services/token";
import { ILoginData, IRegisterData, IUser } from "../types/user.type";

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

export const addCommentAction = createAsyncThunk<
	IOfferData,
	IReview,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(`${NameSpace.OFFER}/addComment`, async (params, { dispatch, extra: api }) => {
	const { data } = await api.get<IOfferData>(APIRoute.OFFERS, { params });
	return data;
});

export const loginAction = createAsyncThunk<
	IUser,
	ILoginData,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(`${NameSpace.USER}/login`, async (loginData, { dispatch, extra: api }) => {
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
});

export const registerAction = createAsyncThunk<
	IUser,
	IRegisterData,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(
	`${NameSpace.USER}/register`,
	async (registerData, { dispatch, extra: api }) => {
		try {
			const { data } = await api.post<IUser>(APIRoute.REGISTER, registerData);
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

export const authMeAction = createAsyncThunk<
	IUser,
	undefined,
	{
		dispatch: AppDispatch;
		state: RootState;
		extra: AxiosInstance;
	}
>(`${NameSpace.USER}/authMe`, async (_, { dispatch, extra: api }) => {
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
