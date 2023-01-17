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

export interface IUser {
	id: number;
	name: string;
	isPro: boolean;
	avatarUrl: string;
}

export interface IOffer {
	city: ICity;
	previewImage: string;
	images: string[];
	title: string;
	isFavorite: boolean;
	isPremium: boolean;
	rating: number;
	type: string;
	bedrooms: number;
	maxAdults: number;
	price: number;
	goods: string[];
	host: IUser;
	description: string;
	location: ILocation;
	_id: number;
}

export interface IReview {
	id: number;
	user: IUser;
	rating: number;
	comment: string;
	date: string;
}

export type FavoriteListType = Record<ICity["name"], IOffer[]>;

export interface IOfferFetchParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	order?: string;
	cityId?: string;
}

export type IOfferData = {
	offersCount: number;
	pagesCount: number;
	data: IOffer[];
};
