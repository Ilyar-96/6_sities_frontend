import React from 'react';
import { ICity, IOffer } from '../../types/offer.type';

export interface MapProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	city: ICity;
	offers: IOffer[];
}