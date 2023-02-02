import { ApartmentCard } from '../../components/apartmentCard/ApartmentCard';
import { Link } from "react-router-dom";
import { AppRoute, cityHashBase } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getFavorites } from '../../store/user/selectors';
import { FavoritesObjectType } from "../../types/user.type";
import { changeActiveCity } from "../../store/city/city";
import { ICity } from '../../types/offer.type';


export const FavoritesLayout = () => {
	const dispatch = useAppDispatch();
	const favoritesList = useAppSelector(getFavorites);

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
			<h1 className="favorites__title">Saved listing</h1>
			<ul className="favorites__list">
				{Object.entries(favoritesObject).map(([city, offers]) => <li className="favorites__locations-items" key={city}>
					<div className="favorites__locations locations locations--current">
						<div className="locations__item">
							<Link className="locations__item-link" to={`${AppRoute.HOME}#${cityHashBase}${city}`} onClick={() => onClick(offers[0].city)}>
								<span>{city}</span>
							</Link>
						</div>
					</div>
					<div className="favorites__places">
						{offers.map(offer => <ApartmentCard className="favorites__card" key={offer._id} data={offer} />)}
					</div>
				</li>)}
			</ul>
		</section>
	);
};
