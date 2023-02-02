import { searchPrevPathnameBase } from "../const";
export const getPathnameFromLocationSearch = (
	search: string
): string | undefined => {
	const searchBase = "?" + searchPrevPathnameBase;
	if (search.indexOf(searchBase) === -1) {
		return;
	}

	const pathname = search.replace(searchBase, "");
	return pathname;
};
