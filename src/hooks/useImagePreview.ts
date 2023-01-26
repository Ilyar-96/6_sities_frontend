import React from "react";

export const useImagePreview = () => {
	const [selectedFile, setSelectedFile] = React.useState<File | File[]>();
	const [preview, setPreview] = React.useState<string | string[]>();

	React.useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}

		if (Array.isArray(selectedFile)) {
			const objectUrls: string[] = selectedFile.map((f) => {
				return URL.createObjectURL(f);
			});
			setPreview(objectUrls);
			return () => {
				objectUrls.forEach((objectUrl) => URL.revokeObjectURL(objectUrl));
			};
		}

		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	return { selectedFile, setSelectedFile, preview };
};
