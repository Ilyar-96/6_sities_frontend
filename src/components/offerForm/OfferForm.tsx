import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getIsAuth } from "../../store/user/selectors";
import { CreateOfferType } from "../../types/offer.type";
import { notifyError } from "../../utils";
import { Input } from "../input/Input";
import { Textarea } from "../textarea/Textarea";

export const OfferForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getIsAuth);

	const formSchema = Yup.object().shape({
		city: Yup.string()
			.required("Enter city id"),
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
		formState: { errors, isValid },
	} = useForm<CreateOfferType>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
	});

	React.useEffect(() => {
		if (isAuth) {
			reset();
		}
		// eslint-disable-next-line
	}, [isAuth]);

	const onSubmit: SubmitHandler<CreateOfferType> = (values: CreateOfferType) => {
		try {
			console.log(values);
			// dispatch(loginAction(values));
		} catch (err) {
			if (err instanceof Error) {
				console.log(err);
				notifyError(err.message);
			}
		}
	};

	return (<form className="add-offer__form form" onSubmit={handleSubmit(onSubmit)}>
		<Input
			type="text"
			label="City"
			errorMessage={errors.city?.message}
			{...register("city")}
		/>
		<Input
			type="text"
			label="Title"
			errorMessage={errors.title?.message}
			{...register("title")}
		/>
		<Input
			type="text"
			label="Is premium?"
			errorMessage={errors.isPremium?.message}
			{...register("isPremium")}
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
			label="Maximum 
			adults amount"
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
		<button className="form__submit button" type="submit" disabled={!isValid}>Add apartment</button>
	</form>);
};