import { BACKEND_URL } from "../services/api";

export const getImageAbsoluteUrl = (url: string) => {
	return url.indexOf("http") === -1 ? BACKEND_URL + url : url;
};
