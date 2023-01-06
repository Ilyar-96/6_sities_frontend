import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NameSpace, FetchStatus } from "../../const";
import { IOfferState } from "../../types/state";
import { fetchOffersAction } from "../apiActions";
import { ICity } from "../../types/offer.type";

const cities: ICity[] = [
	{
		name: "Paris",
		location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
	},
	{
		name: "Cologne",
		location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
	},
	{
		name: "Brussels",
		location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
	},
	{
		name: "Amsterdam",
		location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
	},
	{
		name: "Hamburg",
		location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
	},
	{
		name: "Dusseldorf",
		location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
	},
	{
		name: "Berlin",
		location: { latitude: 50.938361, longitude: 6.959974, zoom: 13 },
	},
];

const initialState: IOfferState = {
	entities: [],
	cities: cities,
	offersStatus: FetchStatus.IDLE,
	citiesStatus: FetchStatus.IDLE,
	error: null,
};

export const offerSlice = createSlice({
	name: NameSpace.OFFER,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchOffersAction.pending, (state) => {
				state.error = null;
				state.offersStatus = FetchStatus.PENDING;
			})
			.addCase(fetchOffersAction.fulfilled, (state, action) => {
				state.entities = action.payload;
				state.offersStatus = FetchStatus.FULFILLED;
			})
			.addCase(fetchOffersAction.rejected, (state, action) => {
				state.error = "Something went wrong. Try later again.";
				state.offersStatus = FetchStatus.REJECTED;
			});
	},
});
