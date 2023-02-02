import React from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { AppRoute } from '../../const';
import logoUrl from './logo.svg';

export const Footer: React.FC = () => {

	return (
		<footer className="footer container">
			<Link className="footer__logo-link" to={AppRoute.HOME}>
				<LazyLoadImage
					className="footer__logo"
					src={logoUrl}
					alt="6 cities logo"
					width={64}
					height={33}
				/>
			</Link>
		</footer>
	);
};
