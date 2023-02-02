import { Link } from "react-router-dom";
import { AppRoute } from '../../const';

export const FavoritesNoAuthLayout = () => {
	return (
		<section className="favorites favorites--empty">
			<h1 className="visually-hidden">Favorites (You are not authorized)</h1>
			<div className="favorites__status-wrapper">
				<b className="favorites__status">You are not authorized.</b>
				<Link to={AppRoute.LOGIN}>Sign in</Link>
				<span> | </span>
				<Link to={AppRoute.REGISTER}>Sign up</Link>
			</div>
		</section>
	);
};
