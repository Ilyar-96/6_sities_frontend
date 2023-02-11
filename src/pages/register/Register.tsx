import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from "yup";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header, Input } from "../../components";
import { AppRoute, citeName, searchPrevPathnameBase, titleSep } from "../../const";
import { getIsAuth } from '../../store/user/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import emptyAvatarUrl from '../../assets/img/avatar.svg';
import { useImagePreview } from '../../hooks/useImagePreview';
import { registerAction } from "../../store/apiUserActions";
import { IRegisterData } from "../../types/user.type";
import { getActiveCity } from '../../store/city/selectors';
import { getPathnameFromLocationSearch, notifyError } from "../../utils";
import { Helmet } from "react-helmet-async";

export const Register: React.FC = () => {
	const activeCity = useAppSelector(getActiveCity);
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getIsAuth);
	const fileInputRef = React.useRef<HTMLInputElement>(null);
	const { selectedFile, setSelectedFile, preview } = useImagePreview();
	const location = useLocation();
	const prevPath = React.useMemo<string | undefined>(
		() => getPathnameFromLocationSearch(location.search),
		[location]);
	const navPath = prevPath ? prevPath : AppRoute.HOME;

	const formSchema = Yup.object().shape({
		name: Yup.string()
			.required("Enter email")
			.min(3, 'Must be at least 3 characters long'),
		email: Yup.string()
			.required("Enter email")
			.email("Invalid email"),
		password: Yup.string().required("Enter password")
	});

	const {
		register,
		handleSubmit,
		reset,
		setFocus,
		formState: {
			errors,
			isValid,
			isSubmitting
		},
	} = useForm<IRegisterData>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
	});

	const onAvatarClick = () => {
		fileInputRef.current?.click();
	};

	React.useEffect(() => {
		setFocus("name");
	}, [setFocus]);

	React.useEffect(() => {
		if (isAuth) {
			reset();
		}
		// eslint-disable-next-line
	}, [isAuth]);

	const onSubmit: SubmitHandler<IRegisterData> = async (values) => {
		const formData = new FormData();
		formData.append("email", values.email);
		if (selectedFile && !Array.isArray(selectedFile)) {
			formData.append("avatar", selectedFile);
		}
		formData.append("name", values.name);
		formData.append("password", values.password);
		try {
			await dispatch(registerAction(formData));
		} catch (err) {
			if (err instanceof Error) {
				console.log(err);
				notifyError(err.message);
			}
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLImageElement>) => {
		if (e.code === "Enter" || e.code === "Space") {
			onAvatarClick();
		}
	};

	if (isAuth) {
		return <Navigate to={navPath} />;
	}

	return (
		<div className="page page--gray page--login">
			<Helmet>
				<title>{"Sign up" + titleSep + citeName}</title>
			</Helmet>
			<Header />
			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign up</h1>
						<form className="login__form form" onSubmit={handleSubmit(onSubmit)}>
							<div className="form__avatar-wrapper">
								<LazyLoadImage
									className="form__avatar"
									src={typeof preview === "string" ? preview : emptyAvatarUrl}
									onClick={onAvatarClick}
									alt="Avatar preview"
									effect="blur"
									tabIndex={0}
									onKeyDown={onKeyDown}
								/>
								<Input
									className="form__input form__input--avatar"
									type="file"
									placeholder="Avatar"
									accept="image/*"
									name="avatarUrl"
									ref={fileInputRef}
									onChange={onChange}
								/>
							</div>
							<Input
								type="text"
								placeholder="Name"
								errorMessage={errors.name?.message}
								{...register("name")}
							/>
							<Input
								type="email"
								placeholder="Email"
								errorMessage={errors.email?.message}
								{...register("email")}
							/>
							<Input
								type="password"
								placeholder="Password"
								errorMessage={errors.password?.message}
								{...register("password")}
							/>
							<div className="form__input-wrapper">
								<div className="form__info">Already have an account?
									<Link
										className="form__info-link"
										to={{
											pathname: AppRoute.LOGIN,
											search: prevPath ? searchPrevPathnameBase + prevPath : undefined
										}}
									> Sign in</Link></div>
							</div>
							<button
								className="form__submit button"
								type="submit"
								disabled={!isValid || isSubmitting}
							>Sign up</button>
						</form>
					</section>
					<section className="locations locations--login locations--current">
						<div className="locations__item">
							{activeCity && <Link className="locations__item-link" to={AppRoute.HOME}>
								<span>{activeCity.name}</span>
							</Link>}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};
