import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ReviewItemProps } from './ReviewItem.type';
import { Rating } from '..';
import { getImageAbsoluteUrl, convertDateToMYYYY } from "../../utils";
import emptyAvatarUrl from '../../assets/img/avatar.svg';

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
	const { user, description, createdAt, rating } = review;

	return (
		<li className="reviews__item">
			<div className="reviews__user user">
				<div className="reviews__avatar-wrapper user__avatar-wrapper">
					<LazyLoadImage
						className="reviews__avatar user__avatar"
						src={user.avatarUrl ? getImageAbsoluteUrl(user.avatarUrl) : emptyAvatarUrl}
						width={54}
						height={54}
						alt={user.name}
						effect="blur"
					/>
				</div>
				<span className="reviews__user-name">{user.name}</span>
			</div>
			<div className="reviews__info">
				<Rating defaultValue={rating} />
				<p className="reviews__text">{description}</p>
				<time className="reviews__time" dateTime={createdAt.slice(0, 10)}>{convertDateToMYYYY(createdAt)}</time>
			</div>
		</li>
	);
};
