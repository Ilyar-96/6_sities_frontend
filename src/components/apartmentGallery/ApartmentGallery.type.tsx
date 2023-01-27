import { IOffer } from '../../types/offer.type';

export interface ApartmentGalleryProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	images: IOffer["images"];
}