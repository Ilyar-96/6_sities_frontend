import { FC } from 'react';
import cn from 'classnames';
import { Menu, Portal, TabItem } from "../.";
import { AppRoute, MediaQueries } from '../../const';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useMedia } from "../../hooks/useMedia";
import { toggleMobilePopup } from "../../store/city/city";
import { getCities, getisSmallPopupOpen } from "../../store/city/selectors";
import closeIcon from '../../assets/img/close.svg';
import { useLocation } from "react-router-dom";

export const MobileMenu: FC = () => {
	const isSmall = useMedia(MediaQueries.S);
	const dispatch = useAppDispatch();
	const isOpen = useAppSelector(getisSmallPopupOpen);
	const cities = useAppSelector(getCities);
	const location = useLocation();

	const onClick = () => {
		dispatch(toggleMobilePopup());
	};

	if (!isSmall || location.pathname === AppRoute.LOGIN || location.pathname === AppRoute.REGISTER) {
		return null;
	}

	return (
		<Portal>
			<div className={cn("mob-locations", { "mob-locations--open": isOpen })}>
				{location.pathname === AppRoute.HOME && <ul className="mob-locations__list">
					{cities.map((city) => (<TabItem key={city._id} city={city} />))}
				</ul>}
				<Menu />
				<button className="mob-locations__close" onClick={onClick}>
					<img src={closeIcon} alt="Close" />
					<span className="visually-hidden">Close modal</span>
				</button>
			</div>
		</Portal>
	);
};
