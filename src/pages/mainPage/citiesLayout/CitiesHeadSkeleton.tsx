import React from "react";
import ContentLoader from "react-content-loader";

export const CitiesHeadSkeleton: React.FC = () => (
	<ContentLoader
		speed={2}
		width={296}
		height={102}
		viewBox="0 0 296 102"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	>
		<rect x="0" y="0" rx="5" ry="5" width="256" height="28" />
		<rect x="0" y="50" rx="5" ry="5" width="106" height="18" />
	</ContentLoader>
);
