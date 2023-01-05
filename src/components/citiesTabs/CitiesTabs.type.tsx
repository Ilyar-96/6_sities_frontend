import { ICity } from '../../types/offer.type';
export interface CitiesTabsProps {
	activeCity: ICity;
	onClick: (city: ICity) => void;
}