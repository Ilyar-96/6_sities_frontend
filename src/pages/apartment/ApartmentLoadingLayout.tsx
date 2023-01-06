import { ApartmentGallerySkeleton, ApartmentInfoSkeleton } from "../../components";

export const ApartmentLoadingLayout = () => {
	return (
		<>
			<ApartmentGallerySkeleton />
			<ApartmentInfoSkeleton />
		</>
	);
};
