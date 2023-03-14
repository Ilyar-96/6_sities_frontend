import axios, {
	AxiosError,
	AxiosHeaders,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from "axios";
import { StatusCodes } from "http-status-codes";
import { getToken } from "./token";
import { notifyWarning } from "../utils";

const StatusCodeMapping: Record<number, boolean> = {
	[StatusCodes.BAD_REQUEST]: true,
	[StatusCodes.UNAUTHORIZED]: true,
	[StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
	!!StatusCodeMapping[response.status];

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REQUEST_TIMEOUT = 10000;

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

	api.interceptors.response.use(
		(response) => response,
		(error: AxiosError<{ message: string }>) => {
			if (error.response && shouldDisplayError(error.response)) {
				notifyWarning(error.response.data.message);
			}

			throw error;
		}
	);

	return api;
};
