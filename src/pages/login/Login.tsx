import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from "../../components";
import { APPRoute } from '../../const';

export const Login: React.FC = () => {
	return (
		<div className="page page--gray page--login">
			<Header />
			<main className="page__main page__main--login">
				<div className="page__login-container container">
					<section className="login">
						<h1 className="login__title">Sign in</h1>
						<form className="login__form form" action="#" method="post">
							<div className="login__input-wrapper form__input-wrapper">
								<label className="visually-hidden">E-mail</label>
								<input className="login__input form__input" type="email" name="email" placeholder="Email" required />
							</div>
							<div className="login__input-wrapper form__input-wrapper">
								<label className="visually-hidden">Password</label>
								<input className="login__input form__input" type="password" name="password" placeholder="Password" required />
							</div>
							<div className="login__input-wrapper form__input-wrapper">
								<div className="login__info">Don't have an account? <Link className="login__info-link" to={APPRoute.REGISTER}>Sign up</Link></div>
							</div>
							<button className="login__submit form__submit button" type="submit">Sign in</button>
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