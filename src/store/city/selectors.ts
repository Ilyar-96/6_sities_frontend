import { NameSpace } from "../../const";
import { RootState } from "../../types/state";

export const getCities = (state: RootState) => state[NameSpace.CITY].entities;
export const getCitiesStatus = (state: RootState) =>
	state[NameSpace.CITY].status;
export const getCitiesErrorMessage = (state: RootState) =>
	state[NameSpace.CITY].error;
