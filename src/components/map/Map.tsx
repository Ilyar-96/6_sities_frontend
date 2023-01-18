import React from 'react';
import cn from 'classnames';
import { MapProps } from './Map.type';
import { YMaps, Map, Placemark, Clusterer } from "@pbe/react-yandex-maps";
import { Link } from "react-router-dom";
import { IOffer } from "../../types/offer.type";
import { Rating } from '../rating/Rating';
import { APPRoute } from "../../const";
import closeSvg from '../../assets/img/close.svg';

export const MapSection: React.FC<MapProps> = ({ city, offers, className, ...props }) => {
	const [selectedOffer, setSelectedOffer] = React.useState<IOffer | null>(null);

	return (
		<section className={cn(className, "map")} {...props} >
			<YMaps>
				{city && <Map
					className="map__wrapper"
					defaultState={{
						center: [city.location.latitude, city.location.longitude],
						zoom: city.location.zoom,
						controls: ["zoomControl", "fullscreenControl"],
					}}
					modules={["control.ZoomControl", "control.FullscreenControl"]}
				>
					<Clusterer
						options={{
							preset: "islands#invertedBlueClusterIcons",
							groupByCoordinates: false,
						}}
					>
						{offers.map((offer, i) => (
							<Placemark
								key={offer._id}
								geometry={[offer.location.latitude, offer.location.longitude]}
								options={{
									preset: selectedOffer?._id === offer._id ? "islands#redDotIcon" : "islands#blueDotIcon",
								}}
								onClick={() => setSelectedOffer(offer)}
							/>
						))}
					</Clusterer>
				</Map>
				}
			</YMaps>

			{selectedOffer && <div className="map__popup map-popup">
				<h2 className="map-popup__title"><Link to={APPRoute.APARTMENT + '/' + selectedOffer._id}>{selectedOffer?.title}</Link></h2>
				<Rating
					value={selectedOffer.rating}
					size="s"
					className="map-popup__rating"
					isCountVisible
				/>
				<div className="map-popup__address">Адресс</div>

				<button
					className="map-popup__close"
					onClick={() => setSelectedOffer(null)}
				>
					<img src={closeSvg} alt="Close popup" />
					<div className="visually-hidden">Close popup</div>
				</button>
			</div>}
		</section>
	);
};
