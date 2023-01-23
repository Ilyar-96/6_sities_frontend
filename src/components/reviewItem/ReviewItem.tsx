import React from 'react';
import { ReviewItemProps } from './ReviewItem.type';
import { Rating } from '..';
import { convertDateToMYYYY } from '../../utils/convertDateToMYYYY';
import { BACKEND_URL } from "../../services/api";

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
	const { user, description, createdAt, rating } = review;

	return (
		<li className="reviews__item">
			<div className="reviews__user user">
				<div className="reviews__avatar-wrapper user__avatar-wrapper">
					<img className="reviews__avatar user__avatar" src={BACKEND_URL + user.avatarUrl} width={54} height={54} alt={user.name} />
				</div>
				<span className="reviews__user-name">{user.name}</span>
			</div>
			<div className="reviews__info">
				<Rating value={rating} />
				<p className="reviews__text">{description}</p>
				<time className="reviews__time" dateTime={createdAt.slice(0, 10)}>{convertDateToMYYYY(createdAt)}</time>
			</div>
		</li>
	);
};
