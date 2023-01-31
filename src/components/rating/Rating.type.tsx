import { UseFormSetValue } from "react-hook-form";
import { CreateOfferType } from "../../types/offer.type";

export interface RatingProps extends
	React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	ratingSize?: 's' | "m" | "l";
	ratingType?: 'static' | "checkable";
	isCountVisible?: boolean;
	getValue?: (val: number) => void;
	defaultValue: number;
}