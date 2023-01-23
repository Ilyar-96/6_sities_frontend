import React from 'react';
import cn from "classnames";
import { UserProps } from './Rating.type';
import emptyAvatarUrl from '../../assets/img/avatar.svg';
import { BACKEND_URL } from "../../services/api";
import { useAppSelector } from '../../hooks';
import { getIsAuth } from "../../store/user/selectors";

export const User: React.FC<UserProps> = ({ user, className, ...props }) => {
	const isAuth = useAppSelector(getIsAuth);

	return (
		<div className={cn("user", className)} {...props}>
			<div className={cn("user__avatar-wrapper", "user__avatar-wrapper", {
				"user__avatar-wrapper--pro": user.isPro
			})}>
				<img className="user__avatar" src={user.avatarUrl ? BACKEND_URL + user.avatarUrl : emptyAvatarUrl} width={74} height={74} alt={`Host ${user.name} avatar`} />
			</div>
			<span className="user__name">{user.name}</span>
			{isAuth && <>
				<span className="user__contacts">Contacts:</span>
				<span className="user__email">Email: 	<a href={`mailto:${user.email}`} rel="nofollow">{user.email}</a></span>
				<span className="user__phone" >Phone number:
					<a href={`tel:${user.phone}`} rel="nofollow">{user.phone}</a>
				</span>
			</>}
			{user.isPro && <span className="user__status">Pro</span>}
		</div>
	);
};
