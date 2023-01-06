import React from "react";
import ContentLoader from "react-content-loader";

export const ApartmentGallerySkeleton = () => (
	<div className="property__gallery-container container">
		<div className="property__gallery">
			<ContentLoader
				speed={2}
				width={785}
				height={404}
				viewBox="0 0 785 404"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="0" y="0" rx="0" ry="0" width="260" height="200" />
				<rect x="524" y="0" rx="0" ry="0" width="260" height="200" />
				<rect x="262" y="0" rx="0" ry="0" width="260" height="200" />
				<rect x="0" y="202" rx="0" ry="0" width="260" height="200" />
				<rect x="524" y="202" rx="0" ry="0" width="260" height="200" />
				<rect x="262" y="202" rx="0" ry="0" width="260" height="200" />
			</ContentLoader>
		</div>
	</div>
);
