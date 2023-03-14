import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useLocation } from "react-router-dom";
import { AppRoute, searchPrevPathnameBase } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleMobilePopup } from "../../store/city/city";
import { getIsAuth, getIsHost, getUserData } from "../../store/user/selectors";
import { logout } from "../../store/user/user";
import { getImageAbsoluteUrl } from "../../utils";
import emptyAvatarUrl from './avatar.svg';

export const Menu: FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getIsAuth);
	const isHost = useAppSelector(getIsHost);
	const user = useAppSelector(getUserData);
	const { pathname } = useLocation();

	const toggleMobilePopupHandler = () => {
		dispatch(toggleMobilePopup());
	};

	const logOut = () => {
		dispatch(logout());
		toggleMobilePopupHandler();
	};
	return <nav className="header__nav">
		<ul className="header__nav-list">
			{(isAuth && user) ? (<>

				{isHost &&
					<li className="header__nav-item">
						<Link
							className="header__nav-link"
							to={AppRoute.ADD_OFFER}
							onClick={toggleMobilePopupHandler}
						>
							<span className="header__apartment">Add new Apartment</span>
						</Link>
					</li>}

				<li className="header__nav-item user">
					<Link
						className="header__nav-link header__nav-link--profile"
						to={AppRoute.FAVORITES}
						onClick={toggleMobilePopupHandler}
					>
						<LazyLoadImage className="header__avatar" src={user.avatarUrl ? getImageAbsoluteUrl(user.avatarUrl) : emptyAvatarUrl} alt={`${user.name} avatar`} />
						<span className="header__user-name">{user.email}</span>
						<span className="header__favorite-count">{user.favorites.length}</span>
					</Link>
				</li>
				<li className="header__nav-item">
					<button className="header__nav-link" onClick={logOut}>
						<span className="header__signout">Sign out</span>
					</button>
				</li>
			</>) : (
				<>
					<li className="header__nav-item header__nav-item--register">
						<Link
							className="header__nav-link"
							to={{
								pathname: AppRoute.LOGIN,
								search: `${searchPrevPathnameBase}${pathname}`,
							}}
							onClick={toggleMobilePopupHandler}
						>
							<span className="header__signout">Sign in</span>
						</Link>
					</li>
				</>
			)}
		</ul>
	</nav>;
};