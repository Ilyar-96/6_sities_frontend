import { createAPI } from "./api";
import { APIRoute } from "../const";
import { IOffer } from "../types/offer.type";

const api = createAPI();

const offerService = {
	getOne: async (id: number | string) => {
		const { data } = await api.get<IOffer>(APIRoute.OFFERS + "/" + id);
		return data;
	},
};

export default offerService;
