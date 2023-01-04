import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { APPRoute } from '../../const';
import logoUrl from './logo.svg';

export const Header: React.FC = () => {
	const { pathname } = useLocation();
	const isShowNav = pathname !== '/login' && pathname !== '/register';

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
							<li className="header__nav-item user">
								<Link className="header__nav-link header__nav-link--profile" to={APPRoute.FAVORITES}>
									<div className="header__avatar-wrapper">
									</div>
									<span className="header__user-name">Oliver.conner@gmail.com</span>
									<span className="header__favorite-count">3</span>
								</Link>
							</li>
							<li className="header__nav-item">
								<a className="header__nav-link" href="#">
									<span className="header__signout">Sign out</span>
								</a>
							</li>
						</ul>
					</nav>}
				</div>
			</div>
		</header>
	);
};
