import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NameSpace, FetchStatus } from "../../const";
import { IOfferState } from "../../types/state";
import { fetchOffersAction } from "../apiActions";
import { SortTypes } from "../../components/sort/Sort.type";

const initialState: IOfferState = {
	pagesCount: 0,
	offersCount: 0,
	entities: [],
	status: FetchStatus.IDLE,
	error: null,
	activeSort: SortTypes.DATE,
};

export const offerSlice = createSlice({
	name: NameSpace.OFFER,
	initialState,
	reducers: {
		changeActiveSort: (state, action: PayloadAction<SortTypes>) => {
			state.activeSort = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchOffersAction.pending, (state) => {
				state.error = null;
				state.status = FetchStatus.PENDING;
			})
			.addCase(fetchOffersAction.fulfilled, (state, action) => {
				state.entities = action.payload.data;
				state.pagesCount = action.payload.pagesCount;
				state.offersCount = action.payload.offersCount;
				state.status = FetchStatus.FULFILLED;
			})
			.addCase(fetchOffersAction.rejected, (state, action) => {
				state.error = "Something went wrong. Try later again.";
				state.status = FetchStatus.REJECTED;
			});
	},
});

export const { changeActiveSort } = offerSlice.actions;
