import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = {
	position: "top-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: "light",
};

export const notifyInfo = (message: string) => toast.info(message, options);
export const notifyError = (message: string) => toast.error(message, options);
export const notifyWarning = (message: string) => toast.warn(message, options);
export const notifySuccess = (message: string) =>
	toast.success(message, options);
