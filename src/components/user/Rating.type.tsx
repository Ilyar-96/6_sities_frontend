import { IUser } from '../../types/offer.type';

export interface UserProps extends
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	user: IUser;
}