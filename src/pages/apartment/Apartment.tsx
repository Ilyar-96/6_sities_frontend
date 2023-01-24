import React from 'react';
import { Header, ApartmentCard, ApartmentGallery, ApartmentInfo, ReviewList, ReviewForm, VerticalCardSkeleton, MapSection } from '../../components';
import { useNavigate, useParams } from "react-router-dom";
import offerService from '../../services/offerService';
import { IOffer } from '../../types/offer.type';
import { ApartmentLoadingLayout } from './ApartmentLoadingLayout';
import { notifyError } from '../../utils';
import { APPRoute } from '../../const';

export const Apartment = () => {
	const { id } = useParams();
	const [offer, setOffer] = React.useState<IOffer>();
	const [isOfferLoading, setIsOfferLoading] = React.useState<boolean>(true);
	const [
		isNeighbourhoodOfferLoading,
		setIsneighbourhoodOffersLoading
	] = React.useState<boolean>(true);
	const navigate = useNavigate();

	const getOffer = async () => {
		if (id) {
			try {
				const data = await offerService.getOne(id);
				setOffer(data);
				setIsOfferLoading(false);
				setIsneighbourhoodOffersLoading(false);
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

					{/* <MapSection className="property__map" /> */}
				</section>

				<div className="container">
					<section className="near-places places">
						<h2 className="near-places__title">Other places in the neighbourhood</h2>

						<div className="near-places__list places__list">
							{/* {!isNeighbourhoodOfferLoading ? offers.slice(0, 3).map(offer => (
								<ApartmentCard
									className="near-places__card"
									key={offer._id}
									data={offer}
								/>
							)) :
								Array.from(new Array(3)).map((_, i) => <VerticalCardSkeleton key={i} />)
							} */}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};
