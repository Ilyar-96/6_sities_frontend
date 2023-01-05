import React from 'react';
import cn from "classnames";
import { UserProps } from './Rating.type';
import emptyAvatarUrl from '../../assets/img/avatar.svg';

export const User: React.FC<UserProps> = ({ user, className, ...props }) => {

	return (
		<div className={cn("user", className)} {...props}>
			<div className={cn("user__avatar-wrapper", "user__avatar-wrapper", {
				"user__avatar-wrapper--pro": user.isPro
			})}>
				<img className="user__avatar" src={user.avatarUrl ? user.avatarUrl : emptyAvatarUrl} width={74} height={74} alt={`Host ${user.name} avatar`} />
			</div>
			<span className="user__name">{user.name}</span>
			{user.isPro && <span className="user__status">Pro</span>}
		</div>
	);
};
