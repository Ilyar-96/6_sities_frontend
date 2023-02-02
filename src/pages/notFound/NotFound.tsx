import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Footer, Header } from "../../components";
import { AppRoute, citeName, titleSep } from "../../const";
import imageUrl from './cat-dog-vacation-summer.jpg';

export const NotFound = () => {
	return <div className="page page--not-found-empty">
		<Header />
		<Helmet>
			<title>{"404 Page not found" + titleSep + citeName}</title>
		</Helmet>
		<main className="page__main page__main--not-found page__main--not-found-empty">
			<div className="page__not-found-container container">
				<section className="not-found not-found--empty">
					<div className="not-found__status-wrapper">
						<div className="not-found__top">Whoops!</div>
						<h1 className="not-found__status"><b>404 Page Not Found</b></h1>
						<div className="not-found__image-wrapper">
							<img className="not-found__image" src={imageUrl} alt="Cat and dog on vacation" />
						</div>
						<p className="not-found__status-description"><b>Looks like this page went on vacation</b></p>
						<div className="not-found__status-direction">Try our <Link to={AppRoute.HOME}>homepage</Link> instead</div>
					</div>
				</section>
			</div>
		</main>
		<Footer />
	</div>;
};