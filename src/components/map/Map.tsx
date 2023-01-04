import React from 'react';
import cn from 'classnames';
import { MapProps } from './Map.type';

export const Map: React.FC<MapProps> = ({ className, ...props }) => {
	return (
		<section className={cn(className, "map")} />
	);
};
