import React from 'react';
import { Header, ApartmentCard, ApartmentGallery, ApartmentInfo, ReviewList, ReviewForm, MapSection } from '../../components';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApartmentLoadingLayout } from './ApartmentLoadingLayout';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
	getOffers,
	getSingleOfferFetchingStatus,
	getSingleOffer,
	getActiveSort
} from '../../store/offers/selectors';
import { deleteOfferAction, fetchOffersAction, fetchSingleOfferAction } from '../../store/apiOfferActions';
import { getIsAuth, getUserData } from '../../store/user/selectors';
import { FetchStatus, APPRoute } from '../../const';
import { notifyWarning, notifySuccess } from '../../utils/notify';
import { confirmAlert } from "react-confirm-alert";
import { removeFavorite } from "../../store/user/user";
import { setIdleStatusForSingleOffer } from "../../store/offers/offer";

export const Apartment = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { id } = useParams();
	const offers = useAppSelector(getOffers);
	const activeSort = useAppSelector(getActiveSort);
	const isAuth = useAppSelector(getIsAuth);
	const user = useAppSelector(getUserData);
	const offerLoadingStatus = useAppSelector(getSingleOfferFetchingStatus);
	const offer = useAppSelector(getSingleOffer);
	const isEditable = user?._id === offer?.host._id;

	React.useEffect(() => {
		if (offer && (offers.length === 0 || offer.city._id !== offers[0].city._id)) {
			const [sortBy, order] = activeSort.split('_');
			dispatch(fetchOffersAction({
				sortBy,
				order,
				cityId: offer.city._id
			}));
		}
		// eslint-disable-next-line
	}, [offer, id]);

	React.useEffect(() => {
		if (id) {
			dispatch(fetchSingleOfferAction(id));
		}
		// eslint-disable-next-line
	}, [id]);

	React.useEffect(() => {
		if (offerLoadingStatus === FetchStatus.REJECTED) {
			console.log(offerLoadingStatus === FetchStatus.REJECTED);
			dispatch(setIdleStatusForSingleOffer());
			navigate(APPRoute.HOME);
			notifyWarning("Apartment with this id does not exist");
		}
		// eslint-disable-next-line
	}, [offerLoadingStatus, id]);

	const onDelete = () => {
		if (id) {
			try {
				dispatch(deleteOfferAction(id));
				dispatch(removeFavorite(id));
				navigate(APPRoute.HOME);
				notifySuccess("Successfully deleted");
			} catch (err) {
				notifyWarning("Failed to delete");
			}
		}
	};

	const deleteHandler = () => {
		confirmAlert({
			title: 'Confirm to submit',
			message: 'Are you sure you want to delete this?',
			closeOnEscape: true,
			closeOnClickOutside: true,
			buttons: [
				{
					label: 'Delete',
					onClick: onDelete
				},
				{
					label: 'Cancel',
				}
			]
		});
	};

	return (
		<div className="page">
			<Header />
			<main className="page__main page__main--property">
				<section className="property">
					{offer && isEditable &&
						<div className="property__tools tools">
							<Link className="tools__edit" to={APPRoute.ADD_OFFER + "/" + offer?._id} title="Edit">
								<span className="visually-hidden">Edit</span>
							</Link>
							<button
								className="tools__delete"
								type="button"
								title="Delete"
								onClick={deleteHandler}
							>
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

					{offer && <MapSection
						className="property__map"
						centralLocation={offer.location}
						offers={offers}
						activeOffer={offer}
					/>}
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
