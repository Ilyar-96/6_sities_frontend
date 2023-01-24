import React from 'react';
import { Header, ApartmentCard, ApartmentGallery, ApartmentInfo, ReviewList, ReviewForm, VerticalCardSkeleton, MapSection } from '../../components';
import { useNavigate, useParams } from "react-router-dom";
import offerService from '../../services/offerService';
import { IOffer } from '../../types/offer.type';
import { ApartmentLoadingLayout } from './ApartmentLoadingLayout';
import { notifyError } from '../../utils';
import { APPRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getOffers } from '../../store/offers/selectors';
import { fetchOffersAction } from "../../store/apiActions";
import { getActiveCity } from "../../store/city/selectors";

export const Apartment = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const [offer, setOffer] = React.useState<IOffer>();
	const [isOfferLoading, setIsOfferLoading] = React.useState<boolean>(true);
	const offers = useAppSelector(getOffers);
	const activeCity = useAppSelector(getActiveCity);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!offers.length && activeCity) {
			dispatch(fetchOffersAction({
				page: 1,
				limit: 0,
				cityId: activeCity._id
			}));
		}
	}, [activeCity]);

	const getOffer = async () => {
		if (id) {
			try {
				const data = await offerService.getOne(id);
				setOffer(data);
				setIsOfferLoading(false);
			} catch (err) {
				if (err instanceof Error) {
					notifyError(err.message);
					console.log(err);
				}
				navigate(APPRoute.MAIN);
			}
		}
	};

	React.useEffect(() => {
		getOffer();
	}, [id]);

	return (
		<div className="page">
			<Header />
			<main className="page__main page__main--property">
				<section className="property">
					{offer && !isOfferLoading ?
						<>
							<ApartmentGallery offer={offer} />

							<div className="property__container container">
								<div className="property__wrapper">
									<ApartmentInfo offer={offer} />
									<section className={"reviews"}>
										<h2 className="reviews__title">Reviews · <span className="reviews__amount">{offer.comments.length}</span></h2>
										<ReviewList reviews={offer.comments} />
									</section>
								</div>
							</div>
						</> :
						<ApartmentLoadingLayout />
					}

					<div className="property__container container">
						<div className="property__wrapper">
							<section className={"property__reviews reviews"}>
								<ReviewForm />
							</section>
						</div>
					</div>

					{offer && <MapSection className="property__map" centralLocation={offer.location} offers={offers} activeOffer={offer} />}
				</section>

				{offer && offer.nearbyOffers.length > 0 && <div className="container">
					<section className="near-places places">
						<h2 className="near-places__title">Other places in the neighbourhood</h2>

						<div className="near-places__list places__list">
							{offer.nearbyOffers.map(offer => (
								<ApartmentCard
									className="near-places__card"
									key={offer._id}
									data={offer}
								/>
							))}
						</div>
					</section>
				</div>}
			</main>
		</div>
	);
};
