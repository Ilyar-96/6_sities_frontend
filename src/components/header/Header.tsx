import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AppRoute, MediaQueries } from '../../const';
import { useAppDispatch } from '../../hooks';
import { useMedia } from "../../hooks/useMedia";
import { toggleMobilePopup } from "../../store/city/city";
import { Menu } from "../.";
import logoUrl from './logo.svg';
import menuIcon from '../../assets/img/menu.svg';

export const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const { pathname } = useLocation();
	const isShowNav = pathname !== AppRoute.LOGIN && pathname !== AppRoute.REGISTER;
	const isSmall = useMedia(MediaQueries.S);

	const onClick = () => {
		dispatch(toggleMobilePopup());
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
					{!isSmall && isShowNav && <Menu />}
					{isSmall &&
						<button className="tabs-btn" onClick={onClick}>
							<img src={menuIcon} alt="Open tabs" />
							<span className="visually-hidden">Open tabs</span>
						</button>}
				</div>
			</div>
		</header>
	);


};
