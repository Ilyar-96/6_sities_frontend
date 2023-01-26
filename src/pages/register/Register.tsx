import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Header, Input } from "../../components";
import { APPRoute } from "../../const";
import { getIsAuth } from '../../store/user/selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';
import emptyAvatarUrl from '../../assets/img/avatar.svg';
import { useImagePreview } from '../../hooks/useImagePreview';
import { registerAction } from "../../store/apiActions";
import { IRegisterData } from "../../types/user.type";
import { getActiveCity } from '../../store/city/selectors';

export const Register: React.FC = () => {
	const activeCity = useAppSelector(getActiveCity);
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getIsAuth);
	const fileInputRef = React.useRef<HTMLInputElement>(null);
	const { selectedFile, setSelectedFile, preview } = useImagePreview();

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
		formState: { errors, isValid },
	} = useForm<IRegisterData>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
	});

	const onAvatarClick = () => {
		fileInputRef.current?.click();
	};

	React.useEffect(() => {
		if (isAuth) {
			reset();
		}
		// eslint-disable-next-line
	}, [isAuth]);

	const onSubmit: SubmitHandler<IRegisterData> = (values) => {
		try {
			const formData = {
				...values,
				image: selectedFile ? selectedFile : ''
			};
			console.log(selectedFile);
			dispatch(registerAction(formData));
		} catch (err) {

		}
	};

	if (isAuth) {
		return <Navigate to={APPRoute.HOME} />;
	}

	return (
		<div className="page page--gray page--login">
			<Header />
			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign up</h1>
						<form className="login__form form" onSubmit={handleSubmit(onSubmit)}>
							<div className="form__avatar-wrapper">
								<img
									className="form__avatar"
									src={preview ? preview : emptyAvatarUrl}
									onClick={onAvatarClick}
									alt="Avatar preview"
								/>
								<label className="visually-hidden">Avatar</label>
								<input
									className="form__input form__input--avatar"
									type="file"
									placeholder="Name"
									accept="image/*"
									ref={fileInputRef}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
										const file = e.target.files?.[0];
										if (file) {
											setSelectedFile(file);
										}
									}}
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
								<div className="form__info">Already have an account? <Link className="form__info-link" to={APPRoute.LOGIN}>Sign in</Link></div>
							</div>
							<button
								className="form__submit button"
								type="submit"
								disabled={!isValid}
							>Sign up</button>
						</form>
					</section>
					<section className="locations locations--login locations--current">
						<div className="locations__item">
							{activeCity && <Link className="locations__item-link" to={APPRoute.HOME}>
								<span>{activeCity.name}</span>
							</Link>}
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};
