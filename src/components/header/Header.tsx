import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AppRoute } from '../../const';
import logoUrl from './logo.svg';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsAuth, getIsHost, getUserData } from "../../store/user/selectors";
import { logout } from '../../store/user/user';
import { getImageAbsoluteUrl } from "../../utils";
import emptyAvatarUrl from './avatar.svg';

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const isShowNav = pathname !== AppRoute.LOGIN && pathname !== AppRoute.REGISTER;
	const isAuth = useAppSelector(getIsAuth);
	const IsHost = useAppSelector(getIsHost);
	const user = useAppSelector(getUserData);

	const logOut = () => {
		dispatch(logout());
	};

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Link className="header__logo-link header__logo-link--active" to={AppRoute.HOME}>
							<LazyLoadImage className="header__logo" src={logoUrl} alt="6 cities logo" width={81} height={41} />
						</Link>
					</div>
					{isShowNav && <nav className="header__nav">
						<ul className="header__nav-list">
							{(isAuth && user) ? (<>

								{IsHost &&
									<li className="header__nav-item">
										<Link className="header__nav-link" to={AppRoute.ADD_OFFER}>
											<span className="header__apartment">Add new Apartment</span>
										</Link>
									</li>
								}

								<li className="header__nav-item user">
									<Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
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
									<li className="header__nav-item">
										<Link className="header__nav-link" to={AppRoute.LOGIN}>
											<span className="header__signout">Sign in</span>
										</Link>
									</li>
								</>
							)}
						</ul>
					</nav>}
				</div>
			</div>
		</header>
	);
};
