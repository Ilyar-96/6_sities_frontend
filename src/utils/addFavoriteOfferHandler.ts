import {
	addFavoriteAction,
	removeFavoriteOfferAction,
} from "../store/apiActions";
import { IOffer } from "../types/offer.type";
import { AppDispatch } from "../types/state";
import { IUser } from "../types/user.type";

export const getIsFavorite = (favoritesList: IOffer[], offerId: string) => {
	return favoritesList.some((offer) => offer._id === offerId);
};

export const addingFavoriteOfferHandler = (
	dispatch: AppDispatch,
	offerId: string,
	user: IUser | null,
	favoritesList: IOffer[]
) => {
	if (!user) return;
	const isFavorite = getIsFavorite(favoritesList, offerId);

	isFavorite
		? dispatch(removeFavoriteOfferAction({ offerId, userId: user._id }))
		: dispatch(addFavoriteAction({ offerId, userId: user._id }));
};
