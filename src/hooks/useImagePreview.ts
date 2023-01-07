import React from "react";

export const useImagePreview = () => {
	const [selectedFile, setSelectedFile] = React.useState<File>();
	const [preview, setPreview] = React.useState<string>();

	React.useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);

		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	return { selectedFile, setSelectedFile, preview };
};
