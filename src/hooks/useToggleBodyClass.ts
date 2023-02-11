import React from "react";

const onMouseClick = () => {
	document.body.classList.add("using-mouse");
	document.body.classList.remove("using-keyboard");
};

const onKeyDown = () => {
	document.body.classList.add("using-keyboard");
	document.body.classList.remove("using-mouse");
};

export const useToggleBodyClass = () => {
	React.useEffect(() => {
		document.body.addEventListener("mousedown", onMouseClick);
		document.body.addEventListener("keydown", onKeyDown);

		return () => {
			document.body.removeEventListener("mousedown", onMouseClick);
			document.body.removeEventListener("keydown", onKeyDown);
		};
	}, []);
};
