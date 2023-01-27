import { ICity, FetchCitiesActionType } from "../types/offer.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute, NameSpace } from "../const";
import { AsyncThunkParamsType } from "../types/state";

export const fetchCitiesAction = createAsyncThunk<
	FetchCitiesActionType,
	string | undefined,
	AsyncThunkParamsType
>(
	`${NameSpace.CITY}/fetchCities`,
	async (initialCityName, { dispatch, extra: api }) => {
		const { data } = await api.get<ICity[]>(APIRoute.CITY);
		return {
			data,
			initialCityName,
		};
	}
);
