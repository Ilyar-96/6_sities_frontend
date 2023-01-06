import React from 'react';
import ContentLoader from "react-content-loader";

export const UserSkeleton = () => {
	return (
		<div>
			<div className="user">
				<ContentLoader
					speed={2}
					width={614}
					height={114}
					viewBox="0 0 614 114"
					backgroundColor="#f3f3f3"
					foregroundColor="#ecebeb"
				>
					<rect x="297" y="102" rx="2" ry="2" width="20" height="12" />
					<rect x="272" y="81" rx="5" ry="5" width="70" height="19" />
					<circle cx="309" cy="37" r="37" />
				</ContentLoader>
			</div>
		</div>
	);
};
