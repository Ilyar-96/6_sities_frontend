export interface InputProps extends
	React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	label?: string;
	errorMessage?: string;
}