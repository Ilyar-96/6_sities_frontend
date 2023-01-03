import React from "react";
import { IOffer } from '../../types/offer.type';

export interface ApartmentCardProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	apartment: IOffer;
}