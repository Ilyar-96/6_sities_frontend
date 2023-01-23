import { createAPI } from "./api";
import { APIRoute } from "../const";
import { IUser } from "../types/offer.type";

const api = createAPI();

export interface ILoginData {
	email: string;
	password: string;
}

export interface IRegisterData extends ILoginData {
	name: string;
}

const authService = {
	login: async ({ email, password }: ILoginData) => {
		const { data } = await api.post<IUser>(APIRoute.LOGIN, { email, password });
		return data;
	},
};

export default authService;
