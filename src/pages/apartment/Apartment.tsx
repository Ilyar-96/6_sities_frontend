import React from 'react';
import { Header, Rating, User, Map, Reviews, ApartmentCard } from '../../components';
import { offer, offers } from '../../mockData';
import { Limits } from '../../const';
import { toCapitalize } from '../../utils';
const pluralize = require('pluralize');

export const Apartment = () => {

	return (
		<div className="page">
			<Header />
			<main className="page__main page__main--property">
				<section className="property">
					<div className="property__gallery-container container">
						<div className="property__gallery">
							{offer.images.slice(0, Limits.maxImagesOnApartmentPage).map(i => (
								<div className="property__image-wrapper" key={i}>
									<img className="property__image" src={i} alt={offer.type} />
								</div>
							))}
						</div>
					</div>
					<div className="property__container container">
						<div className="property__wrapper">
							{offer.isPremium && <div className="property__mark">
								<span>Premium</span>
							</div>}
							<div className="property__name-wrapper">
								<h1 className="property__name">{offer.title}</h1>
								<button className="property__bookmark-button button" type="button">
									<svg className="property__bookmark-icon" width={31} height={33}>
										<use xlinkHref="#icon-bookmark" />
									</svg>
									<span className="visually-hidden">{offer.isFavorite ? "In bookmarks" : "To bookmarks"}</span>
								</button>
							</div>

							<Rating value={offer.rating} isCountVisible size="l" />

							<ul className="property__features">
								<li className="property__feature property__feature--entire">
									{toCapitalize(offer.type)}
								</li>
								<li className="property__feature property__feature--bedrooms">
									{offer.bedrooms} {pluralize("Bedrooms", offer.bedrooms)}
								</li>
								<li className="property__feature property__feature--adults">
									Max {offer.maxAdults} {pluralize("adults", offer.maxAdults)}
								</li>
							</ul>

							<div className="property__price">
								<b className="property__price-value">€{offer.price}</b>
								<span className="property__price-text">&nbsp;night</span>
							</div>
							<div className="property__inside">
								<h2 className="property__inside-title">What's inside</h2>
								<ul className="property__inside-list">
									{offer.goods.map(g => (
										<li className="property__inside-item" key={g}>{g}</li>
									))}
								</ul>
							</div>
							<div className="property__host">
								<h2 className="property__host-title">Meet the host</h2>

								<User user={offer.host} />

								<div className="property__description">
									<p className="property__text">{offer.description}</p>
								</div>
							</div>

							<Reviews className="property__reviews" />
						</div>
					</div>
					<Map />
				</section>

				<div className="container">
					<section className="near-places places">
						<h2 className="near-places__title">Other places in the neighbourhood</h2>

						<div className="near-places__list places__list">
							{offers.slice(0, 3).map(offer => (
								<ApartmentCard
									className="near-places__card"
									key={offer.id}
									data={offer}
								/>
							))}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};
