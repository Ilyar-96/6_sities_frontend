import { IOffer } from "./offer.type";

export interface IUser {
	_id: string;
	name: string;
	isPro: boolean;
	avatarUrl: string;
	role: string[];
	phone: number;
	email: string;
	favorites: IOffer[];
	token?: string;
}

export interface ILoginData {
	email: string;
	password: string;
}

export interface IRegisterData extends ILoginData {
	image: File | string;
	name: string;
}

export interface IOfferAndUserIDs {
	offerId: string;
	userId: string;
}
