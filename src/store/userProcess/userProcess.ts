import { createSlice } from "@reduxjs/toolkit";
import { NameSpace, AuthorizationStatus } from "../../const";
import { UserProcess } from "../../types/state";

const initialState: UserProcess = {
	authorizationStatus: AuthorizationStatus.AUTH,
	user: {
		id: 1,
		name: "Oliver Tyler",
		login: "Oliver.conner@gmail.com",
		favorites: [],
		avatarUrl: "",
	},
};

export const userProcess = createSlice({
	name: NameSpace.USER,
	initialState,
	reducers: {},
	// extraReducers(builder) {
	// 	builder
	// 		.addCase(checkAuthAction.fulfilled, (state) => {
	// 			state.authorizationStatus = AuthorizationStatus.AUTH;
	// 		})
	// 		.addCase(checkAuthAction.rejected, (state) => {
	// 			state.authorizationStatus = AuthorizationStatus.NO_AUTH;
	// 		})
	// 		.addCase(loginAction.fulfilled, (state) => {
	// 			state.authorizationStatus = AuthorizationStatus.AUTH;
	// 		})
	// 		.addCase(loginAction.rejected, (state) => {
	// 			state.authorizationStatus = AuthorizationStatus.NO_AUTH;
	// 		})
	// 		.addCase(logoutAction.fulfilled, (state, action) => {
	// 			state.authorizationStatus = AuthorizationStatus.NO_AUTH;
	// 		});
	// },
});
