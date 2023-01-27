import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkParamsType } from "../types/state";
import { APIRoute, NameSpace } from "../const";
import { saveToken } from "../services/token";
import { ILoginData, IOfferAndUserIDs, IUser } from "../types/user.type";
import { notifySuccess, notifyError } from "../utils";

export const loginAction = createAsyncThunk<
	IUser,
	ILoginData,
	AsyncThunkParamsType
>(`${NameSpace.USER}/login`, async (loginData, { dispatch, extra: api }) => {
	try {
		const { data } = await api.post<IUser>(APIRoute.LOGIN, loginData);
		if (data.token) {
			saveToken(data.token);
		}
		notifySuccess("Successfully authorized");
		return data;
	} catch (err) {
		if (err instanceof Error) {
			if (!("response" in err)) {
				notifyError(err.message);
			}
			throw new Error(err.message);
		} else {
			notifyError("Something went wrong...");
			throw new Error("Something went wrong...");
		}
	}
});

export const registerAction = createAsyncThunk<
	IUser,
	FormData,
	AsyncThunkParamsType
>(
	`${NameSpace.USER}/register`,
	async (registerData, { dispatch, extra: api }) => {
		try {
			const { data } = await api.post<IUser>(
				APIRoute.REGISTRATION,
				registerData
			);
			if (data.token) {
				saveToken(data.token);
			}
			notifySuccess("Successfully registred");
			return data;
		} catch (err) {
			if (err instanceof Error) {
				if (!("response" in err)) {
					notifyError(err.message);
				}
				throw new Error(err.message);
			} else {
				notifyError("Something went wrong...");
				throw new Error("Something went wrong...");
			}
		}
	}
);

export const authMeAction = createAsyncThunk<
	IUser,
	undefined,
	AsyncThunkParamsType
>(`${NameSpace.USER}/authMe`, async (_, { dispatch, extra: api }) => {
	try {
		const { data } = await api.get<IUser>(APIRoute.AUTH_ME);
		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Something went wrong...");
		}
	}
});

export const addFavoriteAction = createAsyncThunk<
	IUser,
	IOfferAndUserIDs,
	AsyncThunkParamsType
>(`${NameSpace.USER}/addFavorites`, async (ids, { dispatch, extra: api }) => {
	try {
		const { data } = await api.patch<IUser>(
			`${APIRoute.USER}/${ids.userId}/${ids.offerId}`
		);
		return data;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		} else {
			throw new Error("Something went wrong...");
		}
	}
});

export const removeFavoriteOfferAction = createAsyncThunk<
	IUser,
	IOfferAndUserIDs,
	AsyncThunkParamsType
>(
	`${NameSpace.USER}/removeFavorites`,
	async (ids, { dispatch, extra: api }) => {
		try {
			const { data } = await api.delete<IUser>(
				`${APIRoute.USER}/${ids.userId}/${ids.offerId}`
			);
			return data;
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(err.message);
			} else {
				throw new Error("Something went wrong...");
			}
		}
	}
);
