import React from "react";
import ContentLoader from "react-content-loader";

export const CitiesTabsSkeleton: React.FC = () => (
	<ContentLoader
		speed={2}
		width={1008}
		height={57}
		viewBox="0 0 1008 57"
		backgroundColor="#cacaca"
	>
		<rect x="0" y="0" rx="0" ry="0" width="132" height="38" />
		<rect x="168" y="0" rx="0" ry="0" width="132" height="38" />
		<rect x="672" y="0" rx="0" ry="0" width="132" height="38" />
		<rect x="504" y="0" rx="0" ry="0" width="132" height="38" />
		<rect x="336" y="0" rx="0" ry="0" width="132" height="38" />
		<rect x="840" y="0" rx="0" ry="0" width="132" height="38" />
	</ContentLoader>
);