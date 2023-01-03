
export interface RatingProps extends
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	size?: 's' | "m" | "l";
	type?: 'static' | "checkable";
	isCountVisible?: boolean;
	onChangeValue?: (val: number) => void;
	value: number;
}