import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from "axios";
import { getToken } from "./token";
// import { StatusCodes } from "http-status-codes";
// import { toast } from "react-toastify";
// import { getToken } from "./token";

// const StatusCodeMapping: Record<number, boolean> = {
// 	[StatusCodes.BAD_REQUEST]: true,
// 	[StatusCodes.UNAUTHORIZED]: true,
// 	[StatusCodes.NOT_FOUND]: true,
// };

// const shouldDisplayError = (response: AxiosResponse) =>
// 	!!StatusCodeMapping[response.status];

export const BACKEND_URL = "http://localhost:5000/";
// export const BACKEND_URL = "https://six-sities.onrender.com/";
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
	const api = axios.create({
		baseURL: BACKEND_URL,
		timeout: REQUEST_TIMEOUT,
	});

	api.interceptors.request.use((config: AxiosRequestConfig) => {
		const token = getToken();

		if (token && config.headers) {
			(config.headers as AxiosHeaders).set("authorization", token);
		}

		return config;
	});

	// api.interceptors.response.use(
	//   (response) => response,
	//   (error: AxiosError<{error: string}>) => {
	//     if (error.response && shouldDisplayError(error.response)) {
	//       toast.warn(error.response.data.error);
	//     }

	//     throw error;
	//   }
	// );

	return api;
};
