export interface IUser {
	id: string;
	name: string;
	isPro: boolean;
	avatarUrl: string;
	role: string[];
	phone: number;
	email: string;
	favorites: string[];
	token?: string;
}

export interface ILoginData {
	email: string;
	password: string;
}

export interface IRegisterData extends ILoginData {
	avatarUrl: string;
	name: string;
}
