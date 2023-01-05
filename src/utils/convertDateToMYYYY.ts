export const convertDateToMYYYY = (date: string) => {
	return new Date(date).toLocaleString("en-US", {
		month: "long",
		year: "numeric",
	});
};
