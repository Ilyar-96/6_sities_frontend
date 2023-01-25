import cn from 'classnames';
import { Header, Footer } from '../../components';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getUserFavorites, getAuthStatus } from '../../store/user/selectors';
import { FavoritesLayout } from "./FavoritesLayout";
import { FavoritesEmptyLayout } from "./FavoritesEmptyLayout";



export const Favorites = () => {
	const favoritesList = useAppSelector(getUserFavorites);
	const authStatus = useAppSelector(getAuthStatus);
	const isEmpty = authStatus === AuthorizationStatus.AUTH && favoritesList.length === 0;

	return (
		<div className={cn("page", {
			"page--favorites-empty": isEmpty
		})}>
			<Header />
			<main className={cn("page__main", "page__main--favorites", {
				"page__main--favorites-empty": isEmpty
			})}>
				<div className="page__favorites-container container">
					{!isEmpty ?
						<FavoritesLayout /> :
						<FavoritesEmptyLayout />}
				</div>
			</main>
			<Footer />
		</div>
	);
};
