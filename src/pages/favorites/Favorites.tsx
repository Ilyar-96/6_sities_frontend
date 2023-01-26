import cn from 'classnames';
import { Header, Footer } from '../../components';
import { useAppSelector } from '../../hooks';
import { getFavorites, getIsAuth } from '../../store/user/selectors';
import { FavoritesLayout } from "./FavoritesLayout";
import { FavoritesEmptyLayout } from "./FavoritesEmptyLayout";
import { FavoritesNoAuthLayout } from "./FavoritesNoAuthLayout";



export const Favorites = () => {
	const favoritesList = useAppSelector(getFavorites);
	const isAuth = useAppSelector(getIsAuth);
	const isEmpty = favoritesList.length === 0;
	return (
		<div className={cn("page", {
			"page--favorites-empty": isEmpty || !isAuth
		})}>
			<Header />
			<main className={cn("page__main", "page__main--favorites", {
				"page__main--favorites-empty": isEmpty || !isAuth
			})}>
				<div className="page__favorites-container container">
					{isAuth &&
						(!isEmpty ?
							<FavoritesLayout /> :
							<FavoritesEmptyLayout />
						)}

					{!isAuth && <FavoritesNoAuthLayout />}
				</div>
			</main>
			<Footer />
		</div>
	);
};
