import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Header, Input } from "../../components";
import { APPRoute } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsAuth } from "../../store/user/selectors";
import { loginAction } from "../../store/apiActions";
import { notifyError } from '../../utils/notify';
import { ILoginData, IRegisterData } from "../../types/user.type";

export const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getIsAuth);

	const formSchema = Yup.object().shape({
		email: Yup.string()
			.required("Enter email")
			.email("Invalid email"),
		password: Yup.string()
			.required("Enter password")
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

	React.useEffect(() => {
		if (isAuth) {
			reset();
		}
	}, [isAuth]);

	const onSubmit: SubmitHandler<IRegisterData> = (values: ILoginData) => {
		try {
			dispatch(loginAction(values));
		} catch (err) {
			if (err instanceof Error) {
				notifyError(err.message);
			}
		}
	};

	if (isAuth) {
		return <Navigate to={APPRoute.MAIN} />;
	}

	return (
		<div className="page page--gray page--login">
			<Header />
			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign in</h1>
						<form className="login__form form" onSubmit={handleSubmit(onSubmit)}>
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
								<div className="form__info">Don't have an account? <Link className="form__info-link" to={APPRoute.REGISTER}>Sign up</Link></div>
							</div>
							<button
								className="form__submit button"
								type="submit"
								disabled={!isValid}
							>Sign in</button>
						</form>
					</section>
					<section className="locations locations--login locations--current">
						<div className="locations__item">
							<a className="locations__item-link" href="#">
								<span>Amsterdam</span>
							</a>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
};