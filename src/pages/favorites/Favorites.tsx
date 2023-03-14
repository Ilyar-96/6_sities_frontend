import cn from 'classnames';
import { Header, Footer } from '../../components';
import { useAppSelector } from '../../hooks';
import { getAuthStatus, getFavorites, getIsAuth } from '../../store/user/selectors';
import { FavoritesLayout } from "./FavoritesLayout";
import { FavoritesEmptyLayout } from "./FavoritesEmptyLayout";
import { FavoritesNoAuthLayout } from "./FavoritesNoAuthLayout";
import { AuthorizationStatus, AppRoute, citeName, titleSep } from '../../const';
import { FavoritesSkeleton } from "./FavoritesSkeleton";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const Favorites = () => {
	const favoritesList = useAppSelector(getFavorites);
	const isAuth = useAppSelector(getIsAuth);
	const isEmpty = favoritesList.length === 0;
	const authStatus = useAppSelector(getAuthStatus);
	const isLoading = authStatus === AuthorizationStatus.PENDING;

	if (authStatus === AuthorizationStatus.NO_AUTH) {
		return <Navigate to={AppRoute.HOME} />;
	}

	return (
		<div className={cn("page", {
			"page--favorites-empty": isEmpty || !isAuth
		})}>
			<Helmet>
				<title>{"Favorite apartments" + titleSep + citeName}</title>
			</Helmet>
			<Header />
			<main className={cn("page__main", "page__main--favorites", {
				"page__main--favorites-empty": isEmpty || !isAuth
			})}>
				<div className="page__favorites-container container">
					{isLoading && <FavoritesSkeleton />}

					{isAuth && !isLoading &&
						(!isEmpty ?
							<FavoritesLayout /> :
							<FavoritesEmptyLayout />
						)}

					{!isAuth && !isLoading && <FavoritesNoAuthLayout />}
				</div>
			</main>
			<Footer />
		</div>
	);
};
