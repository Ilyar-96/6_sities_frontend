export interface ILoginFormValues {
	email: string;
	password: string;
}
export interface IRegisterFormValues extends ILoginFormValues {
	name: string;
}
