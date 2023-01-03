import React from 'react';
import cn from "classnames";
import { UserProps } from './Rating.type';

export const User: React.FC<UserProps> = ({ user, className, ...props }) => {

	return (
		<div className={cn("user", className)} {...props}>
			<div className={cn("user__avatar-wrapper", "user__avatar-wrapper", {
				"user__avatar-wrapper--pro": user.isPro
			})}>
				<img className="user__avatar" src="img/avatar-angelina.jpg" width={74} height={74} alt="Host avatar" />
			</div>
			<span className="user__name">{user.name}</span>
			{user.isPro && <span className="user__status">Pro</span>}
		</div>
	);
};
