export enum APIRoute {
	OFFERS = "hotels",
}

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
	USER = "user",
	OFFER = "offer",
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
