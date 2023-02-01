import ContentLoader from "react-content-loader";

export const FavoritesSkeleton = () => (
	<section className="favorites">
		<ContentLoader
			speed={2}
			width={1028}
			height={620}
			viewBox="0 0 1028 620"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="0" y="85" rx="0" ry="0" width="132" height="38" />
			<rect x="461" y="0" rx="5" ry="5" width="206" height="36" />
			<rect x="0" y="468" rx="0" ry="0" width="132" height="38" />
			<rect x="260" y="84" rx="5" ry="5" width="182" height="140" />
			<rect x="458" y="86" rx="5" ry="5" width="90" height="24" />
			<rect x="669" y="86" rx="5" ry="5" width="22" height="24" />
			<rect x="458" y="116" rx="5" ry="5" width="70" height="12" />
			<rect x="458" y="136" rx="5" ry="5" width="223" height="22" />
			<rect x="458" y="169" rx="5" ry="5" width="45" height="14" />
			<rect x="259" y="266" rx="5" ry="5" width="182" height="140" />
			<rect x="458" y="268" rx="5" ry="5" width="90" height="24" />
			<rect x="669" y="268" rx="5" ry="5" width="22" height="24" />
			<rect x="458" y="298" rx="5" ry="5" width="70" height="12" />
			<rect x="458" y="318" rx="5" ry="5" width="223" height="22" />
			<rect x="458" y="351" rx="5" ry="5" width="45" height="14" />
			<rect x="259" y="468" rx="5" ry="5" width="182" height="140" />
			<rect x="458" y="470" rx="5" ry="5" width="90" height="24" />
			<rect x="669" y="470" rx="5" ry="5" width="22" height="24" />
			<rect x="458" y="500" rx="5" ry="5" width="70" height="12" />
			<rect x="458" y="520" rx="5" ry="5" width="223" height="22" />
			<rect x="458" y="553" rx="5" ry="5" width="45" height="14" />
		</ContentLoader>
	</section>
);