import React from 'react';
import logoUrl from './logo.svg';
import { APPRoute } from '../../const';
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const Footer: React.FC = () => {

	return (
		<footer className="footer container">
			<Link className="footer__logo-link" to={APPRoute.HOME}>
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
