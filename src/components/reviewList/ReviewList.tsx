import React from "react";
import { ReviewListProps } from './ReviewList.type';
import { ReviewItem } from '../reviewItem/ReviewItem';

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
	return (
		<ul className="reviews__list">
			{reviews.map(r => <ReviewItem key={r._id} review={r} />)}
		</ul>
	);
};
