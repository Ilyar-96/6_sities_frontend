import { combineReducers } from "@reduxjs/toolkit";
import { NameSpace } from "../const";
import { userProcess } from "./userProcess/userProcess";

export const rootReducer = combineReducers({
	[NameSpace.USER]: userProcess.reducer,
});
