import { SortTypes } from '../../../components/sort/Sort.type';
import { IOffer, ICity } from '../../../types/offer.type';

export interface CitiesLayoutProps {
	sortType: SortTypes;
	city: ICity;
	offers: IOffer[];
	sortChangeHandler: (value: SortTypes) => void;
}