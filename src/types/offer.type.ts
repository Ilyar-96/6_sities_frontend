import { IUser } from "./user.type";

export interface ILocation {
	latitude: number;
	longitude: number;
	zoom: number;
}

export interface ICity {
	_id: string;
	name: string;
	location: ILocation;
}

export interface IReview {
	_id: string;
	user: IUser;
	offer?: string;
	rating: number;
	description: string;
	createdAt: string;
	updatedAt: string;
}

export interface IOffer {
	city: ICity;
	previewImage: string;
	images: string[];
	comments: IReview[];
	title: string;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
	type: string;
	address: string;
	bedrooms: number;
	maxAdults: number;
	price: number;
	goods: string[];
	host: IUser;
	description: string;
	location: ILocation;
	_id: string;
	nearbyOffers: IOffer[];
}

export type FavoriteListType = Record<ICity["name"], IOffer[]>;

export interface IOfferFetchParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	order?: string;
	cityId?: string;
}

export type FetchOffersActionType = {
	offersCount: number;
	pagesCount: number;
	data: IOffer[];
};

export type FetchCitiesActionType = {
	initialCityName: string | undefined;
	data: ICity[];
};
