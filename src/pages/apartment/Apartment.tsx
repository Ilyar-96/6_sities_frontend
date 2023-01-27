import React from 'react';
import { Header, ApartmentCard, ApartmentGallery, ApartmentInfo, ReviewList, ReviewForm, MapSection } from '../../components';
import { Link, useParams } from "react-router-dom";
import { ApartmentLoadingLayout } from './ApartmentLoadingLayout';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
	getOffers,
	getSingleOfferFetchingStatus,
	getSingleOffer,
	getSingleOfferErrorMessage
} from '../../store/offers/selectors';
import { fetchOffersAction, fetchSingleOfferAction } from '../../store/apiActions';
import { getActiveCity } from "../../store/city/selectors";
import { getIsAuth, getUserData } from '../../store/user/selectors';
import { FetchStatus, APPRoute } from '../../const';

export const Apartment = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams();
	const offers = useAppSelector(getOffers);
	const activeCity = useAppSelector(getActiveCity);
	const isAuth = useAppSelector(getIsAuth);
	const user = useAppSelector(getUserData);
	const offerLoadingStatus = useAppSelector(getSingleOfferFetchingStatus);
	const offer = useAppSelector(getSingleOffer);
	const isEditable = user?._id === offer?.host._id;
	// const errorMessage = useAppSelector(getSingleOfferErrorMessage);

	React.useEffect(() => {
		if (!offers.length && activeCity) {
			dispatch(fetchOffersAction({
				page: 1,
				limit: 0,
				cityId: activeCity._id
			}));
		}
	}, [activeCity]);


	React.useEffect(() => {
		if (id) {
			dispatch(fetchSingleOfferAction(id));
		}
	}, [id]);

	return (
		<div className="page">
			<Header />
			<main className="page__main page__main--property">
				<section className="property">
					{isEditable &&
						<div className="property__tools tools">
							<Link className="tools__edit" to={APPRoute.ADD_OFFER} title="Edit">
								<span className="visually-hidden">Edit</span>
							</Link>
							<button className="tools__delete" type="button" title="Delete">
								<span className="visually-hidden">Delete</span>
							</button>
						</div>
					}

					{offer && offerLoadingStatus !== FetchStatus.PENDING ?
						<>
							<ApartmentGallery images={offer.images} />

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

					{isAuth && <div className="property__container container">
						<div className="property__wrapper">
							<section className={"property__reviews reviews"}>
								<ReviewForm />
							</section>
						</div>
					</div>}

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
