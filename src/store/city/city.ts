import { createSlice } from "@reduxjs/toolkit";
import { FetchStatus, NameSpace } from "../../const";
import { ICityState } from "../../types/state";
import { fetchCitiesAction } from "../apiActions";

const initialState: ICityState = {
	entities: [],
	status: FetchStatus.IDLE,
	error: null,
};

export const citySlice = createSlice({
	name: NameSpace.CITY,
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchCitiesAction.pending, (state) => {
				state.error = null;
				state.status = FetchStatus.PENDING;
			})
			.addCase(fetchCitiesAction.fulfilled, (state, action) => {
				state.entities = action.payload;
				state.status = FetchStatus.FULFILLED;
			})
			.addCase(fetchCitiesAction.rejected, (state) => {
				state.error = "Something went wrong. Try later again.";
				state.status = FetchStatus.REJECTED;
			});
	},
});
