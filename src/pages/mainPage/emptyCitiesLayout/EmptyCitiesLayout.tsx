import React from 'react';
import { EmptyCitiesLayoutProps } from './EmptyCitiesLayout.type';

export const EmptyCitiesLayout: React.FC<EmptyCitiesLayoutProps> = ({ title, children }) => {

	return (
		<div className="cities">
			<div className="cities__places-container cities__places-container--empty container">
				<section className="cities__no-places">
					<div className="cities__status-wrapper tabs__content">
						{title && <b className="cities__status">{title}</b>}
						<p className="cities__status-description">{children}</p>
					</div>
				</section>
				<div className="cities__right-section" />
			</div>
		</div>
	);
};