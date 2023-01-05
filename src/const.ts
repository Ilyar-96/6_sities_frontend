export enum APIRoute {}

export enum APPRoute {
	MAIN = "/",
	APARTMENT = "/apartment",
	LOGIN = "/login",
	REGISTER = "/register",
	FAVORITES = "/favorites",
}

export const Limits = {
	maxImagesOnApartmentPage: 6,
};

export enum NameSpace {
	USER = "USER",
}

export enum AuthorizationStatus {
	AUTH = "AUTH",
	NO_AUTH = "NO_AUTH",
	UNKNOWN = "UNKNOWN",
}
