import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { APPRoute } from '../../const';
import logoUrl from './logo.svg';
import { useAppSelector } from '../../hooks';
import { getIsAuth, getUserData } from "../../store/user/selectors";
import emptyAvatarUrl from './avatar.svg';

export const Header: React.FC = () => {
	const { pathname } = useLocation();
	const isShowNav = pathname !== APPRoute.LOGIN && pathname !== APPRoute.REGISTER;
	const isAuth = useAppSelector(getIsAuth);
	const user = useAppSelector(getUserData);

	return (
		<header className="header">
			<div className="container">
				<div className="header__wrapper">
					<div className="header__left">
						<Link className="header__logo-link header__logo-link--active" to={APPRoute.MAIN}>
							<img className="header__logo" src={logoUrl} alt="6 cities logo" width={81} height={41} />
						</Link>
					</div>
					{isShowNav && <nav className="header__nav">
						<ul className="header__nav-list">
							{isAuth ? (<>
								<li className="header__nav-item user">
									<Link className="header__nav-link header__nav-link--profile" to={APPRoute.FAVORITES}>
										<img className="header__avatar" src={user.avatarUrl ? user.avatarUrl : emptyAvatarUrl} alt={`${user.name} avatar`} />
										<span className="header__user-name">{user.login}</span>
										<span className="header__favorite-count">{user.favorites.length}</span>
									</Link>
								</li>
								<li className="header__nav-item">
									<a className="header__nav-link" href="#">
										<span className="header__signout">Sign out</span>
									</a>
								</li>
							</>) : (
								<>
									<li className="header__nav-item">
										<a className="header__nav-link" href="#">
											<span className="header__signout">Sign in</span>
										</a>
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
