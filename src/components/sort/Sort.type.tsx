import React from "react";

export enum SortTypes {
	POPULAR = "popular",
	PRICE_ASC = "price_asc",
	PRICE_DESC = "price_desc",
	RATE = "rate"
}

export interface SortProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
	active: SortTypes;
	onSortChange: (value: SortTypes) => void;
}