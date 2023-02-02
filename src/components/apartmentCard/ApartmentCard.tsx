import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ApartmentCardProps } from './ApartmentCard.type';
import { AppRoute, FetchStatus } from '../../const';
import { Rating } from '../rating/Rating';
import noImagePreviewUrl from '../../assets/img/noImagePreview.jpg';
import { getImageAbsoluteUrl, getIsFavorite } from "../../utils";
import { useAppSelector } from '../../hooks';
import { getFavoritesStatus, getFavorites } from '../../store/user/selectors';
import { useFavoriteOffer } from "../../hooks/useFavoriteOfferHandler";

export const ApartmentCard: React.FC<ApartmentCardProps> = ({ data, className, ...props }) => {
	const favoritesStatus = useAppSelector(getFavoritesStatus);
	const previewImageUrl = data.previewImage ? getImageAbsoluteUrl(data.previewImage) : noImagePreviewUrl;
	const favoritesList = useAppSelector(getFavorites);
	const { toggleFavoriteOfferHandler } = useFavoriteOffer();

	return (
		<div className={cn(className, "place-card")} {...props}>
			{data.isPremium && <div className="place-card__mark">
				<span>Premium</span>
			</div>}
			<div className="place-card__image-wrapper">
				<Link to={`${AppRoute.APARTMENT}/${data._id}`}>
					<LazyLoadImage
						className="place-card__image"
						src={previewImageUrl}
						width={260}
						height={200}
						alt={data.title}
						effect="blur"
					/>
				</Link>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">€{data.price}</b>
						<span className="place-card__price-text">/&nbsp;night</span>
					</div>
					<button className={cn(
						"place-card__bookmark-button",
						" button",
						{ "place-card__bookmark-button--active": getIsFavorite(favoritesList, data._id) })}
						disabled={favoritesStatus === FetchStatus.PENDING}
						onClick={() => toggleFavoriteOfferHandler(data._id)}
						type="button"
					>
						<svg className="place-card__bookmark-icon" width={18} height={19}>
							<use xlinkHref="#icon-bookmark" />
						</svg>
						<span className="visually-hidden">{getIsFavorite(favoritesList, data._id) ? "In bookmarks" : "To bookmarks"}</span>
					</button>
				</div>
				<Rating defaultValue={data.rating} ratingSize="s" />
				<h2 className="place-card__name">
					<Link to={`${AppRoute.APARTMENT}/${data._id}`}>
						{data.title}
					</Link>
				</h2>
				<p className="place-card__type">{data.type}</p>
			</div>
		</div >
	);
};
