import React from "react";

export const useClickOutside = (
	popupRef: React.RefObject<HTMLElement>,
	cb: Function
) => {
	const handleOutsideClick = (e: MouseEvent) => {
		if (popupRef.current && !e.composedPath().includes(popupRef.current)) {
			cb();
		}
	};

	React.useEffect(() => {
		const body = document.body;

		body.addEventListener("click", handleOutsideClick);

		return () => body.removeEventListener("click", handleOutsideClick);
	}, []);
};
