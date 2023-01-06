import React from 'react';
import ContentLoader from "react-content-loader";
import { UserSkeleton, ReviewItemSkeleton } from '../';

export const ApartmentInfoSkeleton: React.FC = () => {
	return (
		<div className="property__container container">
			<div className="property__wrapper">
				<ContentLoader
					speed={2}
					width={614}
					height={525}
					viewBox="0 0 614 525"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="207" y="0" rx="5" ry="5" width="200" height="46" />
					<rect x="211" y="52" rx="5" ry="5" width="192" height="26" />
					<rect x="583" y="47" rx="5" ry="5" width="31" height="33" />
					<rect x="257" y="116" rx="5" ry="5" width="100" height="21" />
					<rect x="421" y="116" rx="5" ry="5" width="100" height="21" />
					<rect x="103" y="116" rx="5" ry="5" width="100" height="21" />
					<rect x="229" y="175" rx="5" ry="5" width="156" height="38" />
					<rect x="228" y="269" rx="5" ry="5" width="166" height="28" />
					<rect x="0" y="325" rx="5" ry="5" width="613" height="122" />
					<rect x="228" y="489" rx="5" ry="5" width="166" height="28" />
				</ContentLoader>

				<UserSkeleton />

				<ContentLoader
					speed={2}
					width={614}
					height={173}
					viewBox="0 0 614 173"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="228" y="108" rx="5" ry="5" width="166" height="28" />
					<rect x="0" y="0" rx="5" ry="5" width="614" height="56" />
				</ContentLoader>

				<ReviewItemSkeleton />
			</div>
		</div>
	);
};
