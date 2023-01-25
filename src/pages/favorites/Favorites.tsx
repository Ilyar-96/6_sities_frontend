import { Header, Footer } from '../../components';
// import { favoriteList } from '../../mockData';
import { ApartmentCard } from '../../components/apartmentCard/ApartmentCard';
import { Link } from "react-router-dom";
import { APPRoute, cityHashBase } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getUserFavorites } from "../../store/user/selectors";
import { FavoritesObjectType } from "../../types/user.type";
import { changeActiveCity } from "../../store/city/city";
import { ICity } from '../../types/offer.type';

export const Favorites = () => {
	const dispatch = useAppDispatch();
	const favoritesList = useAppSelector(getUserFavorites);
	const favoritesObject = favoritesList.reduce((a, b) => {
		(b.city.name in a) ?
			a[b.city.name].push(b)
			: a[b.city.name] = [b];
		return a;
	}, {} as FavoritesObjectType);

	const onClick = (city: ICity) => {
		dispatch(changeActiveCity(city));
	};

	return (
		<div className="page">
			<Header />
			<main className="page__main page__main--favorites">
				<div className="page__favorites-container container">
					<section className="favorites">
						<h1 className="favorites__title">Saved listing</h1>
						<ul className="favorites__list">
							{Object.entries(favoritesObject).map(([city, offers]) => (
								<li className="favorites__locations-items" key={city}>
									<div className="favorites__locations locations locations--current">
										<div className="locations__item">
											<Link
												className="locations__item-link"
												to={`${APPRoute.MAIN}#${cityHashBase}${city}`}
												onClick={() => onClick(offers[0].city)}
											>
												<span>{city}</span>
											</Link>
										</div>
									</div>
									<div className="favorites__places">
										{offers.map((offer) => (
											<ApartmentCard className="favorites__card" key={offer._id} data={offer} />
										))}
									</div>
								</li>
							))}
						</ul>
					</section>
				</div>
			</main>
			<Footer />
		</div>

	);
};
