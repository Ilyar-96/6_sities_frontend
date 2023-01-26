import { ApartmentCard } from '../../components/apartmentCard/ApartmentCard';
import { Link } from "react-router-dom";
import { APPRoute, cityHashBase, AuthorizationStatus } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFavorites, getAuthStatus } from '../../store/user/selectors';
import { FavoritesObjectType } from "../../types/user.type";
import { changeActiveCity } from "../../store/city/city";
import { ICity } from '../../types/offer.type';
import { FavoritesSkeleton } from './FavoritesSkeleton';


export const FavoritesLayout = () => {
	const dispatch = useAppDispatch();
	const favoritesList = useAppSelector(getFavorites);
	const authStatus = useAppSelector(getAuthStatus);
	const isLoading = authStatus === AuthorizationStatus.PENDING;
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
		<section className="favorites">
			{!isLoading ? <>
				<h1 className="favorites__title">Saved listing</h1>
				<ul className="favorites__list">
					{Object.entries(favoritesObject).map(([city, offers]) => <li className="favorites__locations-items" key={city}>
						<div className="favorites__locations locations locations--current">
							<div className="locations__item">
								<Link className="locations__item-link" to={`${APPRoute.HOME}#${cityHashBase}${city}`} onClick={() => onClick(offers[0].city)}>
									<span>{city}</span>
								</Link>
							</div>
						</div>
						<div className="favorites__places">
							{offers.map(offer => <ApartmentCard className="favorites__card" key={offer._id} data={offer} />)}
						</div>
					</li>)}
				</ul>
			</> : <FavoritesSkeleton />}
		</section>
	);
};