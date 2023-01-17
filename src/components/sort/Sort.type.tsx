import React from "react";

export enum SortTypes {
	DATE = "createdAt_desc",
	PRICE_ASC = "price_asc",
	PRICE_DESC = "price_desc",
	RATE = "rating_desc"
}

export interface SortProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
	active: SortTypes;
	onSortChange: (value: SortTypes) => void;
}