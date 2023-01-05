import React from 'react';
import { ReviewItemProps } from './ReviewItem.type';
import { Rating } from '../../../components';
import { convertDateToMYYYY } from '../../../utils/convertDateToMYYYY';

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
	const { user, comment, date, rating } = review;

	return (
		<li className="reviews__item">
			<div className="reviews__user user">
				<div className="reviews__avatar-wrapper user__avatar-wrapper">
					<img className="reviews__avatar user__avatar" src={user.avatarUrl} width={54} height={54} alt={user.name} />
				</div>
				<span className="reviews__user-name">{user.name}</span>
			</div>
			<div className="reviews__info">
				<Rating value={rating} />
				<p className="reviews__text">{comment}</p>
				<time className="reviews__time" dateTime={date.slice(0, 10)}>{convertDateToMYYYY(date)}</time>
			</div>
		</li>
	);
};
