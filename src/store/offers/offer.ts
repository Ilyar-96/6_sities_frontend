import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NameSpace, FetchStatus } from "../../const";
import { IOfferState } from "../../types/state";
import {
	addReviewAction,
	createOfferAction,
	deleteOfferAction,
	fetchOffersAction,
	fetchSingleOfferAction,
	updateReviewAction,
} from "../apiOfferActions";
import { SortTypes } from "../../components/sort/Sort.type";

const initialState: IOfferState = {
	pagesCount: 0,
	offersCount: 0,
	entities: [],
	status: FetchStatus.IDLE,
	error: null,
	activeSort: SortTypes.DATE,
	singleOffer: null,
	singleOfferStatus: FetchStatus.IDLE,
	singleOfferError: null,
	reviewStatus: FetchStatus.IDLE,
};

export const offerSlice = createSlice({
	name: NameSpace.OFFER,
	initialState,
	reducers: {
		changeActiveSort: (state, action: PayloadAction<SortTypes>) => {
			state.activeSort = action.payload;
		},
		setIdleStatusForSingleOffer: (state) => {
			state.singleOfferStatus = FetchStatus.IDLE;
			state.singleOfferError = null;
		},
		setNullToSingleOffer: (state) => {
			state.singleOffer = null;
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
			})
			.addCase(fetchSingleOfferAction.pending, (state) => {
				state.error = null;
				state.singleOfferStatus = FetchStatus.PENDING;
			})
			.addCase(fetchSingleOfferAction.fulfilled, (state, action) => {
				state.singleOffer = { ...action.payload };
				state.singleOfferStatus = FetchStatus.FULFILLED;
			})
			.addCase(fetchSingleOfferAction.rejected, (state) => {
				state.singleOffer = null;
				state.error = "Something went wrong. Try later again.";
				state.singleOfferStatus = FetchStatus.REJECTED;
			})
			.addCase(addReviewAction.pending, (state) => {
				state.reviewStatus = FetchStatus.PENDING;
			})
			.addCase(addReviewAction.rejected, (state) => {
				state.reviewStatus = FetchStatus.REJECTED;
			})
			.addCase(addReviewAction.fulfilled, (state, action) => {
				state.reviewStatus = FetchStatus.FULFILLED;
				state.singleOffer?.comments.push(action.payload);
				if (state.singleOffer?.comments.length) {
					const ratingSum = state.singleOffer?.comments.reduce(
						(sum, comment) => sum + Number(comment.rating),
						0
					);
					const len = state.singleOffer?.comments.length;
					state.singleOffer.rating = Number((ratingSum / len).toFixed(1));
				}
			})
			.addCase(updateReviewAction.pending, (state) => {
				state.reviewStatus = FetchStatus.PENDING;
			})
			.addCase(updateReviewAction.rejected, (state) => {
				state.reviewStatus = FetchStatus.REJECTED;
			})
			.addCase(updateReviewAction.fulfilled, (state, action) => {
				state.reviewStatus = FetchStatus.FULFILLED;
				if (state.singleOffer?.comments.length) {
					const { _id, description, rating } = action.payload;
					state.singleOffer.comments = state.singleOffer.comments.map((c) => {
						if (c._id === _id) {
							return {
								...c,
								description,
								rating,
							};
						}
						return c;
					});
					const ratingSum = state.singleOffer?.comments.reduce(
						(sum, comment) => sum + Number(comment.rating),
						0
					);
					const len = state.singleOffer?.comments.length;
					state.singleOffer.rating = Number((ratingSum / len).toFixed(1));
				}
			})
			.addCase(createOfferAction.pending, (state) => {
				state.error = null;
				state.singleOfferStatus = FetchStatus.PENDING;
			})
			.addCase(createOfferAction.fulfilled, (state) => {
				state.singleOfferStatus = FetchStatus.FULFILLED;
			})
			.addCase(createOfferAction.rejected, (state) => {
				state.error = "Something went wrong. Try later again.";
				state.singleOfferStatus = FetchStatus.REJECTED;
			})
			.addCase(deleteOfferAction.pending, (state) => {
				state.singleOfferStatus = FetchStatus.PENDING;
			})
			.addCase(deleteOfferAction.fulfilled, (state, action) => {
				state.singleOffer = null;
				state.entities = state.entities.filter(
					(offer) => offer._id !== action.payload
				);
				state.singleOfferStatus = FetchStatus.FULFILLED;
			})
			.addCase(deleteOfferAction.rejected, (state) => {
				state.singleOfferStatus = FetchStatus.REJECTED;
			});
	},
});

export const {
	changeActiveSort,
	setIdleStatusForSingleOffer,
	setNullToSingleOffer,
} = offerSlice.actions;
