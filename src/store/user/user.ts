import { createSlice } from "@reduxjs/toolkit";
import { NameSpace, AuthorizationStatus, FetchStatus } from "../../const";
import { IUserState } from "../../types/state";
import {
	addFavoriteAction,
	authMeAction,
	loginAction,
	registerAction,
	removeFavoriteOfferAction,
} from "../apiUserActions";
import { dropToken } from "../../services/token";

const initialState: IUserState = {
	authorizationStatus: AuthorizationStatus.UNKNOWN,
	user: null,
	addingFavoritesStatus: FetchStatus.IDLE,
};

export const userSlice = createSlice({
	name: NameSpace.USER,
	initialState,
	reducers: {
		logout: (state) => {
			dropToken();
			state.authorizationStatus = AuthorizationStatus.NO_AUTH;
			state.user = null;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginAction.fulfilled, (state, action) => {
				state.authorizationStatus = AuthorizationStatus.AUTH;
				state.user = action.payload;
			})
			.addCase(loginAction.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NO_AUTH;
				state.user = null;
			})
			.addCase(registerAction.fulfilled, (state, action) => {
				state.authorizationStatus = AuthorizationStatus.AUTH;
				state.user = action.payload;
			})
			.addCase(registerAction.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NO_AUTH;
				state.user = null;
			})
			.addCase(authMeAction.fulfilled, (state, action) => {
				state.authorizationStatus = AuthorizationStatus.AUTH;
				state.user = action.payload;
			})
			.addCase(authMeAction.pending, (state) => {
				state.authorizationStatus = AuthorizationStatus.PENDING;
			})
			.addCase(authMeAction.rejected, (state) => {
				state.authorizationStatus = AuthorizationStatus.NO_AUTH;
				state.user = null;
			})
			.addCase(addFavoriteAction.pending, (state) => {
				state.addingFavoritesStatus = FetchStatus.PENDING;
			})
			.addCase(addFavoriteAction.fulfilled, (state, action) => {
				state.addingFavoritesStatus = FetchStatus.FULFILLED;
				if (state.user) {
					state.user.favorites = action.payload.favorites;
				}
			})
			.addCase(removeFavoriteOfferAction.pending, (state) => {
				state.addingFavoritesStatus = FetchStatus.PENDING;
			})
			.addCase(removeFavoriteOfferAction.fulfilled, (state, action) => {
				state.addingFavoritesStatus = FetchStatus.FULFILLED;
				if (state.user) {
					state.user.favorites = action.payload.favorites;
				}
			});
	},
});

export const { logout } = userSlice.actions;
