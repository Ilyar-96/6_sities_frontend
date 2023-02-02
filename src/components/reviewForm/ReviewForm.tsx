import { yupResolver } from "@hookform/resolvers/yup";
import React from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { Rating } from "../";
import { addReviewAction, updateReviewAction } from '../../store/apiOfferActions';
import { IReviewData } from "../../types/user.type";
import { Textarea } from '../textarea/Textarea';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { notifyError } from "../../utils";
import { getUserData } from '../../store/user/selectors';
import { useParams } from "react-router-dom";
import { getReviewStatus, getSingleOffer } from '../../store/offers/selectors';
import { FetchStatus } from "../../const";

export const ReviewForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(getUserData);
	const offer = useAppSelector(getSingleOffer);
	const isFirstMount = React.useRef(true);
	const reviewStatus = useAppSelector(getReviewStatus);
	const { id: offerId } = useParams();
	const formSchema = Yup.object().shape({
		description: Yup.string()
			.required("Enter review").min(50, "Review must be at least 50 characters "),
		rating: Yup.number().min(1).max(5)
			.required("Select rating"),
	});
	const userReview = offer?.comments.find((c) => c.user._id === user?._id);
	const [rating, setRating] = React.useState<number>(0);
	const isLoading = reviewStatus === FetchStatus.PENDING;

	const {
		register,
		handleSubmit,
		trigger,
		setValue,
		formState: { errors },
	} = useForm<IReviewData>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
		defaultValues: {
			rating: rating,
		},
		shouldUnregister: false,
	});

	React.useEffect(() => {
		setValue("rating", rating);
		if (!isFirstMount) {
			trigger("rating");
		}
		isFirstMount.current = false;
		// eslint-disable-next-line
	}, [rating]);

	React.useEffect(() => {
		if (userReview) {
			setRating(userReview.rating);
		}
	}, [userReview]);

	const onSubmit: SubmitHandler<IReviewData> = (values: IReviewData) => {
		if (!user || !offerId) return;

		try {
			const formData = {
				description: values.description,
				rating: values.rating,
				user: user?._id,
				offer: offerId,
				reviewId: userReview?._id
			};

			if (userReview) {
				dispatch(updateReviewAction(formData));
			} else {
				dispatch(addReviewAction(formData));
			}
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
				{userReview && <Rating
					ratingSize="l"
					ratingType="checkable"
					getValue={setRating}
					defaultValue={Number(userReview.rating)}
				/>}
				{!userReview &&
					<Rating
						ratingSize="l"
						ratingType="checkable"
						getValue={setRating}
						defaultValue={0}
					/>}

				{offer && errors.rating && <div className="form__error">{errors.rating?.message}</div>}
			</div>

			<Textarea
				className="reviews__textarea form__textarea"
				id="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
				defaultValue={userReview ? userReview.description : ""}
				errorMessage={errors.description?.message}
				{...register("description")}
			/>

			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
				</p>
				<button
					disabled={isLoading}
					className="reviews__submit form__submit button"
					type="submit"
				>
					{userReview ? "Update" : "Submit"}
				</button>
			</div>
		</form>
	);
};
