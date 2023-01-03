export interface ILocation {
	latitude: number;
	longitude: number;
	zoom: number;
}

export interface ICity {
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
	id: number;
}

export interface IReview {
	id: number;
	user: IUser;
	rating: number;
	comment: string;
	date: string;
}
