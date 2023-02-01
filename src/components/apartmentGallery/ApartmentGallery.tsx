import React from 'react';
import { ApartmentGalleryProps } from './ApartmentGallery.type';
import { limits } from '../../const';
import { getImageAbsoluteUrl } from "../../utils";
import cn from 'classnames';
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ApartmentGallery: React.FC<ApartmentGalleryProps> = ({ images, className, ...props }) => {
	return (
		<div
			className={cn("property__gallery-container", "container", className)}
			{...props}
		>
			<div className="property__gallery">
				{
					images.slice(0, limits.maxImagesOnApartmentPage).map(i => {
						const imageUrl = getImageAbsoluteUrl(i);
						return (
							<div className="property__image-wrapper" key={i}>
								<LazyLoadImage
									className="property__image"
									src={imageUrl}
									alt={""}
									effect="blur"
								/>
							</div>
						);
					})
				}
			</div>
		</div>
	);
};
