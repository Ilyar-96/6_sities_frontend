import React from 'react';
import { ILocation, IOffer } from '../../types/offer.type';

export interface MapProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	centralLocation: ILocation;
	offers: IOffer[];
	activeOffer?: IOffer;
}