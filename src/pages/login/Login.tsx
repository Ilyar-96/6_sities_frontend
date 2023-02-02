import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Header, Input } from "../../components";
import { AppRoute, searchPrevPathnameBase } from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsAuth } from "../../store/user/selectors";
import { loginAction } from "../../store/apiUserActions";
import { notifyError } from '../../utils';
import { ILoginData } from "../../types/user.type";
import { getActiveCity } from "../../store/city/selectors";
import { getPathnameFromLocationSearch } from '../../utils/getPathnameFromLocationSearch';

export const Login: React.FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const isAuth = useAppSelector(getIsAuth);
	const activeCity = useAppSelector(getActiveCity);
	const prevPath = React.useMemo<string | undefined>(
		() => getPathnameFromLocationSearch(location.search),
		[location]);
	const navPath = prevPath ? prevPath : AppRoute.HOME;

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
		setFocus,
		formState: { errors, isValid, isSubmitting },
	} = useForm<ILoginData>({
		resolver: yupResolver(formSchema),
		mode: "onChange",
	});

	React.useEffect(() => {
		setFocus("email");
	}, [setFocus]);

	React.useEffect(() => {
		if (isAuth) {
			reset();
		}
		// eslint-disable-next-line
	}, [isAuth]);

	const onSubmit: SubmitHandler<ILoginData> = async (values: ILoginData) => {
		try {
			await dispatch(loginAction(values));
		} catch (err) {
			if (err instanceof Error) {
				console.log(err);
				notifyError(err.message);
			}
		}
	};

	if (isAuth) {
		return <Navigate to={navPath} />;
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
								<div className="form__info">Don't have an account?
									<Link
										className="form__info-link"
										to={{
											pathname: AppRoute.REGISTER,
											search: prevPath ? searchPrevPathnameBase + prevPath : undefined
										}}
									> Sign up</Link>
								</div>
							</div>
							<button
								className="form__submit button"
								type="submit"
								disabled={!isValid || isSubmitting}
							>Sign in</button>
						</form>
					</section>
					<section className="locations locations--login locations--current">
						<div className="locations__item">
							{activeCity &&
								<Link className="locations__item-link" to={AppRoute.HOME} >
									<span>{activeCity.name}</span>
								</Link>}
						</div>
					</section>
				</div>
			</main >
		</div >
	);
};