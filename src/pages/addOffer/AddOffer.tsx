import { Footer, Header } from "../../components";
import { OfferForm } from "../../components/offerForm/OfferForm";
import { useAppSelector } from "../../hooks";
import { getIsAuth } from "../../store/user/selectors";

export const AddOffer = () => {
	const isAuth = useAppSelector(getIsAuth);

	// if (!isAuth) {
	// 	return <Navigate to={APPRoute.HOME} />;
	// }

	return (
		<div className="page page--gray">
			<Header />
			<main className="page__main page__main--add-offer">
				<div className="page__add-offer-container container">
					<section className="add-offer">
						<h1 className="add-offer__title">Add new apartment</h1>
						<OfferForm />
					</section>
				</div>
			</main >
			<Footer />
		</div >
	);
};
