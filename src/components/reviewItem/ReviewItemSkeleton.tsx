import React from 'react';
import ContentLoader from "react-content-loader";

export const ReviewItemSkeleton: React.FC = () => {

	return (
		<div className="reviews__item">
			<ContentLoader
				speed={2}
				width={614}
				height={131}
				viewBox="0 0 614 131"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="76" y="111" rx="5" ry="5" width="88" height="14" />
				<rect x="76" y="0" rx="5" ry="5" width="98" height="16" />
				<circle cx="27" cy="27" r="27" />
				<rect x="0" y="64" rx="5" ry="5" width="54" height="17" />
				<rect x="76" y="24" rx="5" ry="5" width="537" height="84" />
			</ContentLoader>
		</div>
	);
};
