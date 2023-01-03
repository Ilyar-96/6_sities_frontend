import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { ApartmentCardProps } from './ApartmentCard.type';
import { APPRoute } from '../../const';
import { Rating } from '../rating/Rating';

export const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, className, ...props }) => {

	return (
		<div className={cn(className, "place-card")} {...props}>
			{apartment.isPremium && <div className="place-card__mark">
				<span>Premium</span>
			</div>}
			<div className="place-card__image-wrapper">
				<Link to={APPRoute.APARTMENT}>
					<img className="place-card__image" src={apartment.previewImage} width={260} height={200} alt={apartment.title} />
				</Link>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">€{apartment.price}</b>
						<span className="place-card__price-text">/&nbsp;night</span>
					</div>
					<button className={cn(
						"place-card__bookmark-button",
						" button",
						{ "place-card__bookmark-button--active": apartment.isFavorite })}
						type="button"
					>
						<svg className="place-card__bookmark-icon" width={18} height={19}>
							<use xlinkHref="#icon-bookmark" />
						</svg>
						<span className="visually-hidden">{apartment.isFavorite ? "In bookmarks" : "To bookmarks"}</span>
					</button>
				</div>
				<Rating value={apartment.rating} size="s" />
				<h2 className="place-card__name">
					<Link to={APPRoute.APARTMENT}>
						{apartment.title}
					</Link>
				</h2>
				<p className="place-card__type">{apartment.type}</p>
			</div>
		</div >
	);
};
