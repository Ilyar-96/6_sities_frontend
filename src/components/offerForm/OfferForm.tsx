import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import * as Yup from "yup";
import Select from "react-select";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useImagePreview } from "../../hooks/useImagePreview";
import { getIsAuth, getUserData } from '../../store/user/selectors';
import { CreateOfferType } from "../../types/offer.type";
import { notifyError } from "../../utils";
import { ApartmentGallery } from "../apartmentGallery/ApartmentGallery";
import { Input, InputRadio } from "../";
import { Textarea } from "../textarea/Textarea";
import { getCities } from '../../store/city/selectors';
import noImagePreviewUrl from '../../assets/img/noImagePreview.jpg';
import { createOfferAction } from "../../store/apiOfferActions";

export const OfferForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getIsAuth);
	const user = useAppSelector(getUserData);
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
	const gallery = (Array.isArray(previews) && previews?.length) ? previews : [];
	const cities = useAppSelector(getCities);
	const selectOptions = cities.map((c) => ({ value: c._id, label: c.name }));

	const formSchema = Yup.object().shape({
		city: Yup.string()
			.required("Select city"),
		title: Yup.string()
			.required("Enter title"),
		isPremium: Yup.boolean()
			.required("Check this input"),
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
		reset,
		control,
		formState: { errors, isValid },
	} = useForm<CreateOfferType>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
	});

	// React.useEffect(() => {
	// 	if (isAuth) {
	// 		reset();
	// 	}
	// 	// eslint-disable-next-line
	// }, [isAuth]);

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

			for (const key in values) {
				if (Object.prototype.hasOwnProperty.call(values, key)) {
					formData.append(String(key), values[key]);
				}
			}
			dispatch(createOfferAction(formData));
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
	};

	const onPreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			setSelectedPreviewFile(file);
		}
	};

	const onButtonClick = () => {
		fileGalleryInputRef.current?.click();
	};

	const onPreviewClick = () => {
		filePreviewInputRef.current?.click();
	};

	return (
		<form
			className="add-offer__form form"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="form__file-wrapper">
				<img
					className="form__preview"
					onClick={onPreviewClick}
					src={preview && typeof preview === "string" ? preview : noImagePreviewUrl}
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
					gallery.length === 0 && isValid &&
					<div className="form__error">
						Please select images
					</div>
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
					gallery.length === 0 && isValid &&
					<div className="form__error">
						Please select images
					</div>
				}
			</div>

			<div className="form__row">
				<div className="form__col">
					<Input
						type="text"
						label="Title"
						errorMessage={errors.title?.message}
						{...register("title")}
					/>

					<Input
						type="text"
						label="Apartment type"
						errorMessage={errors.type?.message}
						{...register("type")}
					/>
					<Input
						type="text"
						label="Address"
						errorMessage={errors.address?.message}
						{...register("address")}
					/>
					<Input
						type="text"
						label="Bedrooms amount"
						errorMessage={errors.bedrooms?.message}
						{...register("bedrooms")}
					/>
					<Input
						type="text"
						label="Maximum adults amount"
						errorMessage={errors.maxAdults?.message}
						{...register("maxAdults")}
					/>
					<Input
						type="text"
						label="Price"
						errorMessage={errors.price?.message}
						{...register("price")}
					/>
					<Input
						type="text"
						label="Goods"
						errorMessage={errors.goods?.message}
						{...register("goods")}
					/>
					<Textarea
						className="form__textarea--large"
						label="Description"
						errorMessage={errors.description?.message}
						{...register("description")}
					/>

					<div className="form__input-wrapper">
						<div className="form__label">Is premium?</div>
						<InputRadio
							value={"true"}
							label="Yes"
							errorMessage={errors.isPremium?.message}
							{...register("isPremium")}
						/>
						<InputRadio
							label="No"
							value={"false"}
							errorMessage={errors.isPremium?.message}
							{...register("isPremium")}
						/>
					</div>
				</div>
				<div className="form__col">
					<div className="form__input-wrapper">
						<div className="form__label">City</div>
						<Controller
							name="city"
							control={control}
							render={({ field: { onChange, value, ref } }) => (
								<Select
									options={selectOptions}
									value={selectOptions.find((c) => c.value === value)}
									onChange={(val) => onChange(val?.value)}
									defaultValue={null}
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
						errorMessage={errors.latitude?.message}
						{...register("latitude")}
					/>
					<Input
						type="text"
						label="Longitude"
						errorMessage={errors.longitude?.message}
						{...register("longitude")}
					/>
					<Input
						type="text"
						label="Zoom"
						errorMessage={errors.zoom?.message}
						{...register("zoom")}
					/>
				</div>
			</div>

			<button
				className="form__submit button"
				type="submit"
				disabled={!isValid || gallery.length === 0}
			>
				Add apartment
			</button>
		</form>);
};