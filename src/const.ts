export enum APIRoute {
	OFFERS = "offer",
	CITY = "city",
	USER = "host",
	REVIEW = "comment",
	LOGIN = "auth/login",
	REGISTRATION = "auth/registration",
	AUTH_ME = "auth/me",
}

export enum AppRoute {
	HOME = "/",
	APARTMENT = "/apartment",
	LOGIN = "/login",
	REGISTER = "/register",
	FAVORITES = "/favorites",
	ADD_OFFER = "/add-offer",
}

export const limits = {
	maxImagesOnApartmentPage: 6,
	offersPerPage: 10,
};

export enum NameSpace {
	USER = "user",
	OFFER = "offer",
	CITY = "city",
}

export enum AuthorizationStatus {
	AUTH = "AUTH",
	PENDING = "PENDING",
	NO_AUTH = "NO_AUTH",
	UNKNOWN = "UNKNOWN",
}

export enum FetchStatus {
	IDLE = "idle",
	PENDING = "pending",
	FULFILLED = "fulfilled",
	REJECTED = "rejected",
}

export const cityHashBase = "city=";
export const searchPrevPathnameBase = "prev-pathname=";
export const citeName = "6 Cities";
export const titleSep = " | ";
export const matchMediaMobileQuery = "(max-width: 767px)";
