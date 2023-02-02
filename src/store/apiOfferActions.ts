import {
	FetchOffersActionType,
	IOfferFetchParams,
	IReview,
	IOffer,
} from "../types/offer.type";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkParamsType } from "../types/state";
import { APIRoute, NameSpace, AppRoute } from "../const";
import { IReviewData } from "../types/user.type";
import { redirectToRoute } from "./actions";

export const fetchOffersAction = createAsyncThunk<
	FetchOffersActionType,
	IOfferFetchParams,
	AsyncThunkParamsType
>(
	`${NameSpace.OFFER}/fetchOffers`,
	async (params, { dispatch, extra: api }) => {
		const { data } = await api.get<FetchOffersActionType>(APIRoute.OFFERS, {
			params,
		});
		return data;
	}
);

export const fetchSingleOfferAction = createAsyncThunk<
	IOffer,
	string,
	AsyncThunkParamsType
>(`${NameSpace.OFFER}/fetchOffer`, async (id, { dispatch, extra: api }) => {
	const { data } = await api.get<IOffer>(APIRoute.OFFERS + "/" + id);
	return data;
});

export const addReviewAction = createAsyncThunk<
	IReview,
	IReviewData,
	AsyncThunkParamsType
>(`${NameSpace.OFFER}/addReview`, async (body, { dispatch, extra: api }) => {
	const { data } = await api.post<IReview>(APIRoute.REVIEW, body);
	return data;
});

export const updateReviewAction = createAsyncThunk<
	IReview,
	IReviewData,
	AsyncThunkParamsType
>(`${NameSpace.OFFER}/updateReview`, async (body, { dispatch, extra: api }) => {
	const { data } = await api.patch<IReview>(
		APIRoute.REVIEW + "/" + body.reviewId,
		body
	);
	return data;
});

export const createOfferAction = createAsyncThunk<
	IOffer,
	FormData,
	AsyncThunkParamsType
>(`${NameSpace.OFFER}/createOffer`, async (body, { dispatch, extra: api }) => {
	const { data } = await api.post<IOffer>(APIRoute.OFFERS, body);
	dispatch(redirectToRoute(`${AppRoute.APARTMENT}/${data._id}`));
	return data;
});

export const updateOfferAction = createAsyncThunk<
	IOffer,
	{ data: FormData; _id: string },
	AsyncThunkParamsType
>(
	`${NameSpace.OFFER}/updateOfferAction`,
	async (body, { dispatch, extra: api }) => {
		const { data } = await api.post<IOffer>(
			APIRoute.OFFERS + "/" + body._id,
			body.data
		);
		dispatch(redirectToRoute(`${AppRoute.APARTMENT}/${body._id}`));
		return data as IOffer;
	}
);

export const deleteOfferAction = createAsyncThunk<
	string,
	string,
	AsyncThunkParamsType
>(`${NameSpace.OFFER}/deleteOffer`, async (id, { dispatch, extra: api }) => {
	const { data } = await api.delete<string>(APIRoute.OFFERS + "/" + id);
	return data;
});
