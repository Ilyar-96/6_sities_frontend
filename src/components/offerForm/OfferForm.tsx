import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as Yup from "yup";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useImagePreview } from "../../hooks/useImagePreview";
import { getUserData } from '../../store/user/selectors';
import { CreateOfferType } from "../../types/offer.type";
import { getImageAbsoluteUrl, notifyError } from "../../utils";
import { ApartmentGallery } from "../apartmentGallery/ApartmentGallery";
import { Input, InputRadio } from "../";
import { Textarea } from "../textarea/Textarea";
import { getCities } from '../../store/city/selectors';
import noImagePreviewUrl from '../../assets/img/noImagePreview.jpg';
import {
	createOfferAction,
	fetchSingleOfferAction,
	updateOfferAction
} from '../../store/apiOfferActions';
import { useNavigate, useParams } from "react-router-dom";
import { getSingleOffer } from '../../store/offers/selectors';
import { APPRoute } from '../../const';

export const OfferForm: React.FC = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(getUserData);
	const offer = useAppSelector(getSingleOffer);
	const [gallery, setGallery] = React.useState<string[]>([]);
	const [galleryErrorMessage, setGalleryErrorMessage] = React.useState<string | null>(null);
	const [previewErrorMessage, setPreviewErrorMessage] = React.useState<string | null>(null);
	const [previewImage, setPreviewImage] = React.useState<string>(noImagePreviewUrl);
	const fileGalleryInputRef = React.useRef<HTMLInputElement>(null);
	const filePreviewInputRef = React.useRef<HTMLInputElement>(null);
	const {
		preview,
		selectedFile: selectedPreviewFile,
		setSelectedFile: setSelectedPreviewFile
	} = useImagePreview();
	const {
		preview: previews,
		selectedFile: selectedFiles,
		setSelectedFile: setSelectedFiles
	} = useImagePreview();
	const cities = useAppSelector(getCities);
	const selectOptions = cities.map((c) => ({ value: c._id, label: c.name }));
	const isEditable = Boolean(offer && id);

	React.useEffect(() => {
		if (isEditable && offer?.images) {
			setGallery(offer.images);
		}

		if (isEditable && offer?.previewImage) {
			setPreviewImage(getImageAbsoluteUrl(offer.previewImage));
		}
	}, [offer]);

	React.useEffect(() => {
		if (Array.isArray(previews)) {
			setGallery(previews);
		}
	}, [previews]);

	React.useEffect(() => {
		if (typeof preview === "string") {
			setPreviewImage(preview);
		}
	}, [preview]);

	React.useEffect(() => {
		if (id && id !== offer?._id) {
			dispatch(fetchSingleOfferAction(id));
		}
	}, [id]);

	const formSchema = Yup.object().shape({
		city: Yup.string()
			.required("Select city").default(offer?.city._id),
		title: Yup.string()
			.required("Enter title"),
		isPremium: Yup.boolean()
			.required()
			.oneOf([true, false], "Selecting the premium field is required"),
		type: Yup.string()
			.required("Enter apartment type"),
		address: Yup.string()
			.required("Enter apartment address"),
		bedrooms: Yup.number()
			.typeError('Bedrooms amount must be a number')
			.required("Enter bedrooms amount"),
		maxAdults: Yup.number()
			.typeError('Maximum adults amount must be a number')
			.required("Enter maximum adults amount"),
		price: Yup.number()
			.typeError('Price must be a number')
			.required("Enter price"),
		goods: Yup.string()
			.required("Enter goods"),
		description: Yup.string()
			.required("Enter description"),
		latitude: Yup.number()
			.typeError('Latitude must be a number')
			.required("Enter latitude"),
		longitude: Yup.number()
			.typeError('Longitude must be a number')
			.required("Enter longitude"),
		zoom: Yup.number()
			.typeError("Zoom must be a number")
			.required("Enter zoom"),
	});

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = useForm<CreateOfferType>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<CreateOfferType> = (values: Record<string, any>) => {
		try {
			const formData = new FormData();

			formData.append("rating", "5");

			if (user) {
				formData.append("host", user._id);
			}

			if (selectedFiles && Array.isArray(selectedFiles)) {
				selectedFiles.forEach((f) => {
					formData.append("images", f);
				});
			}

			if (selectedPreviewFile && !Array.isArray(selectedPreviewFile)) {
				formData.append("previewImage", selectedPreviewFile);
			}

			if (isEditable && !selectedPreviewFile) {
				formData.append("previewImage", previewImage);
			}

			if (isEditable && !selectedFiles) {
				gallery.forEach((url) => {
					formData.append("images", url);
				});
			}

			for (const key in values) {
				if (Object.prototype.hasOwnProperty.call(values, key)) {
					formData.append(String(key), values[key]);
				}
			}

			(isEditable && id) ?
				dispatch(updateOfferAction({ data: formData, _id: id })) :
				dispatch(createOfferAction(formData));

			navigate(`${APPRoute.APARTMENT}/${id}`);
		} catch (err) {
			if (err instanceof Error) {
				console.log(err);
				notifyError(err.message);
			}
		}
	};

	const onGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;
		const files: File[] = [];

		if (fileList) {
			for (const key in fileList) {
				if (Object.prototype.hasOwnProperty.call(fileList, key)) {
					const file = fileList[key];
					files.push(file);
				}
			}
			setSelectedFiles(files);
		}

		if (fileList && fileList.length && fileList.length % 3 === 0) {
			setGalleryErrorMessage(null);
		} else {
			setGalleryErrorMessage("Please select 3 or 6 images for gallery");
		}
	};

	const onPreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			setSelectedPreviewFile(file);
			setPreviewErrorMessage(null);
		} else {
			setPreviewErrorMessage("Please select preview image");
		}
	};

	const onButtonClick = () => {
		fileGalleryInputRef.current?.click();
	};

	const onPreviewClick = () => {
		filePreviewInputRef.current?.click();
	};

	if (id && !offer) {
		return <h1>Loading</h1>;
	}

	return (
		<form
			className="add-offer__form form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="form__file-wrapper">
				<img
					className="form__preview"
					onClick={onPreviewClick}
					src={previewImage}
					alt="Preview"
					title="Preview (260*200)"
				/>
				<Input
					className="form__input form__input--avatar"
					type="file"
					placeholder="Avatar"
					accept="image/*"
					name="avatarUrl"
					ref={filePreviewInputRef}
					multiple
					onChange={onPreviewChange}
				/>
				{
					previewErrorMessage &&
					<div className="form__error">{previewErrorMessage}</div>
				}
			</div>

			{gallery?.length > 0 &&
				<ApartmentGallery
					images={gallery}
					className="property__dark-gallery-container"
				/>
			}
			<div className="form__file-wrapper">
				<button
					className="form__submit button"
					onClick={onButtonClick}
					type="button"
				>
					{gallery.length === 0 ? "Select images" : "Change images"}
				</button>
				<Input
					className="form__input form__input--avatar"
					type="file"
					placeholder="Avatar"
					accept="image/*"
					name="avatarUrl"
					ref={fileGalleryInputRef}
					multiple
					onChange={onGalleryImagesChange}
				/>
				{
					galleryErrorMessage &&
					<div className="form__error">{galleryErrorMessage}</div>
				}
			</div>

			<div className="form__row">
				<div className="form__col">
					<Input
						type="text"
						label="Title"
						defaultValue={isEditable ? offer?.title : ""}
						errorMessage={errors.title?.message}
						{...register("title")}
					/>

					<Input
						type="text"
						label="Apartment type"
						defaultValue={isEditable ? offer?.type : ""}
						errorMessage={errors.type?.message}
						{...register("type")}
					/>
					<Input
						type="text"
						label="Address"
						defaultValue={isEditable ? offer?.address : ""}
						errorMessage={errors.address?.message}
						{...register("address")}
					/>
					<Input
						type="text"
						label="Bedrooms amount"
						defaultValue={isEditable ? offer?.bedrooms : ""}
						errorMessage={errors.bedrooms?.message}
						{...register("bedrooms")}
					/>
					<Input
						type="text"
						label="Maximum adults amount"
						defaultValue={isEditable ? offer?.maxAdults : ""}
						errorMessage={errors.maxAdults?.message}
						{...register("maxAdults")}
					/>
					<Textarea
						className="form__textarea--large"
						label="Description"
						defaultValue={isEditable ? offer?.description : ""}
						errorMessage={errors.description?.message}
						{...register("description")}
					/>

					<div className="form__input-wrapper">
						<div className="form__label">Is premium?</div>
						<InputRadio
							defaultValue={"true"}
							label="Yes"
							errorMessage={errors.isPremium?.message}
							defaultChecked={isEditable && offer?.isPremium}
							{...register("isPremium")}
						/>
						<InputRadio
							label="No"
							defaultValue={"false"}
							errorMessage={errors.isPremium?.message}
							defaultChecked={isEditable && !offer?.isPremium}
							{...register("isPremium")}
						/>
					</div>
				</div>
				<div className="form__col">
					<Input
						type="text"
						label="Price"
						defaultValue={isEditable ? offer?.price : ""}
						errorMessage={errors.price?.message}
						{...register("price")}
					/>

					<div className="form__input-wrapper">
						<div className="form__label">City</div>
						<Controller
							name="city"
							control={control}
							render={({ field: { onChange, value } }) => (
								<Select
									options={selectOptions}
									isDisabled={isEditable}
									value={selectOptions.find(
										(c) => {
											return (isEditable && offer) ?
												c.value === offer.city._id :
												c.value === value;
										}
									)}
									onChange={(val) => onChange(val?.value)}
									styles={{
										control: (baseStyles, state) => ({
											...baseStyles,
											height: 49,
											borderRadius: 2
										}),
									}}
									theme={(theme) => ({
										...theme,
										borderRadius: 0,
										colors: {
											...theme.colors,
											primary: '#3069a6',
										},
									})}
								/>
							)}
							rules={{ required: true }}
						/>
						{errors.city && <div className="form__error">{errors.city?.message}</div>}
					</div>

					<Input
						type="text"
						label="Latitude"
						defaultValue={isEditable ? offer?.location.latitude : ""}
						errorMessage={errors.latitude?.message}
						{...register("latitude")}
					/>
					<Input
						type="text"
						label="Longitude"
						defaultValue={isEditable ? offer?.location.longitude : ""}
						errorMessage={errors.longitude?.message}
						{...register("longitude")}
					/>
					<Input
						type="text"
						label="Zoom"
						defaultValue={isEditable ? offer?.location.zoom : ""}
						errorMessage={errors.zoom?.message}
						{...register("zoom")}
					/>

					<Textarea
						className="form__textarea--large"
						label="Goods"
						defaultValue={isEditable ? offer?.goods.join("; ") : ""}
						errorMessage={errors.goods?.message}
						{...register("goods")}
					/>
				</div>
			</div>

			<button
				className="form__submit button"
				type="submit"
				disabled={Boolean(!isValid || galleryErrorMessage || previewErrorMessage)}
			>
				{isEditable ? "Update apartment" : "Add apartment"}
			</button>
		</form>);
};