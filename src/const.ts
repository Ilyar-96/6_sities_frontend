export enum APIRoute {
	OFFERS = "offer",
	CITY = "city",
	USER = "host",
	LOGIN = "auth/login",
	REGISTRATION = "auth/registration",
	AUTH_ME = "auth/me",
}

export enum APPRoute {
	MAIN = "/",
	APARTMENT = "/apartment",
	LOGIN = "/login",
	REGISTER = "/register",
	FAVORITES = "/favorites",
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
	NO_AUTH = "NO_AUTH",
	UNKNOWN = "UNKNOWN",
}

export enum FetchStatus {
	IDLE = "idle",
	PENDING = "pending",
	FULFILLED = "fulfilled",
	REJECTED = "rejected",
}
