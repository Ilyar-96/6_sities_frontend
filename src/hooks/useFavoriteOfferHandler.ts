import { useAppDispatch, useAppSelector } from ".";
import {
	removeFavoriteOfferAction,
	addFavoriteAction,
} from "../store/apiUserActions";
import { getFavorites, getUserData } from "../store/user/selectors";
import { getIsFavorite } from "../utils";
import { notifyWarning } from "../utils/notify";

export const useFavoriteOffer = () => {
	const dispatch = useAppDispatch();
	const favoritesList = useAppSelector(getFavorites);
	const user = useAppSelector(getUserData);

	const toggleFavoriteOfferHandler = (offerId: string) => {
		if (!user) return notifyWarning("You are not authorized");

		const isFavorite = getIsFavorite(favoritesList, offerId);

		isFavorite
			? dispatch(removeFavoriteOfferAction({ offerId, userId: user._id }))
			: dispatch(addFavoriteAction({ offerId, userId: user._id }));
	};

	return {
		toggleFavoriteOfferHandler,
	};
};
