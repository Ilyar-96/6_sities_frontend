import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FetchStatus, NameSpace } from "../../const";
import { ICity } from "../../types/offer.type";
import { ICityState } from "../../types/state";
import { fetchCitiesAction } from "../apiActions";

const initialState: ICityState = {
	entities: [],
	status: FetchStatus.IDLE,
	error: null,
	activeCity: null,
};

export const citySlice = createSlice({
	name: NameSpace.CITY,
	initialState,
	reducers: {
		changeActiveCity: (state, action: PayloadAction<ICity>) => {
			state.activeCity = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchCitiesAction.pending, (state) => {
				state.error = null;
				state.status = FetchStatus.PENDING;
			})
			.addCase(fetchCitiesAction.fulfilled, (state, action) => {
				state.entities = action.payload;
				state.status = FetchStatus.FULFILLED;
				state.activeCity = action.payload[0];
			})
			.addCase(fetchCitiesAction.rejected, (state) => {
				state.error = "Something went wrong. Try later again.";
				state.status = FetchStatus.REJECTED;
			});
	},
});

export const { changeActiveCity } = citySlice.actions;
