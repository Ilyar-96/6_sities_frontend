import React from 'react';
import { ApartmentGalleryProps } from './ApartmentGallery.type';
import { limits } from '../../const';
import { BACKEND_URL } from "../../services/api";

export const ApartmentGallery: React.FC<ApartmentGalleryProps> = ({ offer }) => {
	return (
		<div className="property__gallery-container container">
			<div className="property__gallery">
				{
					offer.images.slice(0, limits.maxImagesOnApartmentPage).map(i => (
						<div className="property__image-wrapper" key={i}>
							<img className="property__image" src={BACKEND_URL + i} alt={offer.type} />
						</div>
					))
				}
			</div>
		</div>
	);
};
