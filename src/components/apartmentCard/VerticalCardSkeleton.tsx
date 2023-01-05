import React from "react";
import ContentLoader from "react-content-loader";

export const VerticalCardSkeleton: React.FC = () => (
	<div className={"cities__card place-card"} >
		<ContentLoader
			speed={2}
			width={260}
			height={318}
			viewBox="0 0 260 318"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<circle cx="461" cy="157" r="20" />
			<rect x="0" y="209" rx="5" ry="5" width="56" height="18" />
			<rect x="0" y="0" rx="8" ry="8" width="260" height="200" />
			<rect x="63" y="211" rx="5" ry="5" width="41" height="15" />
			<rect x="234" y="209" rx="5" ry="5" width="26" height="18" />
			<rect x="0" y="236" rx="5" ry="5" width="77" height="16" />
			<rect x="0" y="256" rx="5" ry="5" width="256" height="37" />
			<rect x="0" y="304" rx="5" ry="5" width="101" height="10" />
		</ContentLoader>
	</div>
);
