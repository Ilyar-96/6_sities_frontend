import { IOffer } from "../types/offer.type";

export const getIsFavorite = (favoritesList: IOffer[], offerId: string) => {
	return favoritesList.some((offer) => offer._id === offerId);
};
