import React from 'react';
import cn from 'classnames';
import { reviews } from "../../mockData";
import { ReviewProps } from "./Review.type";
import { ReviewList } from './reviewList/ReviewList';
import { ReviewForm } from '../';

export const Reviews: React.FC<ReviewProps> = ({ className, ...props }) => {
	return (
		<section className={(cn(className, "reviews"))} {...props}>
			<h2 className="reviews__title">Reviews · <span className="reviews__amount">{reviews.length}</span></h2>

			<ReviewList reviews={reviews} />
			<ReviewForm />
		</section>
	);
};
