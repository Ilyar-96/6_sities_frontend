import { yupResolver } from "@hookform/resolvers/yup";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { Rating } from "../";
import { addCommentAction } from "../../store/apiOfferActions";
import { IReviewData } from "../../types/user.type";
import { Textarea } from '../textarea/Textarea';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { notifyError } from "../../utils";
import { getUserData } from '../../store/user/selectors';
import { useParams } from "react-router-dom";

export const ReviewForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(getUserData);
	const { id: offerId } = useParams();
	const formSchema = Yup.object().shape({
		description: Yup.string()
			.required("Enter comment")
	});
	const [rating, setRating] = React.useState<number | null>(null);
	const [ratingError, setRatingError] = React.useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<IReviewData>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
	});

	React.useEffect(() => {
		setRatingError(null);
	}, [rating]);

	const onSubmit: SubmitHandler<IReviewData> = (values: IReviewData) => {
		if (!rating) {
			return setRatingError("You need to choose a rating.");
		}
		if (!user || !offerId) return;

		try {
			const formData = {
				description: values.description,
				rating,
				user: user?._id,
				offer: offerId
			};
			dispatch(addCommentAction(formData));
		} catch (err) {
			if (err instanceof Error) {
				notifyError(err.message);
			}
		}
	};


	return (
		<form className="reviews__form form" onSubmit={handleSubmit(onSubmit)}>
			<label className="reviews__label form__label" htmlFor="review">Your review</label>

			<div className="form__rating-wrapper">
				<Rating
					value={0}
					size="l"
					type="checkable"
					className="reviews__rating-form"
					onChangeValue={setRating}
				/>

				{ratingError && <div className="form__error">{ratingError}</div>}
			</div>

			<Textarea
				className="reviews__textarea form__textarea"
				id="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
				errorMessage={errors.description?.message}
				{...register("description")}
			/>

			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
				</p>
				<button
					className="reviews__submit form__submit button"
					type="submit"
					disabled={!isValid}
				>
					Submit
				</button>
			</div>
		</form>
	);
};
