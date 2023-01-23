import { IUser } from "../../types/user.type";

export interface UserProps extends
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	user: IUser;
}