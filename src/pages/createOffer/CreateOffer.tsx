import { Link, Navigate, useParams } from "react-router-dom";
import { Footer, Header } from "../../components";
import { OfferForm } from "../../components/offerForm/OfferForm";
import { AppRoute } from "../../const";
import { useAppSelector } from "../../hooks";
import { getAuthCheckedStatus, getIsAuth } from "../../store/user/selectors";

export const CreateOffer = () => {
	const { id } = useParams();
	const isAuth = useAppSelector(getIsAuth);
	const isAuthChecked = useAppSelector(getAuthCheckedStatus);

	if (isAuthChecked && !isAuth) {
		return <Navigate to={AppRoute.HOME} />;
	}

	return (
		<div className="page page--gray">
			<Header />
			<main className="page__main page__main--add-offer">
				<div className="page__add-offer-container container">
					{id && <div className="tools tools--update">
						<Link className="tools__btn" to={AppRoute.APARTMENT + "/" + id} title="Edit">
							Back
						</Link>
					</div>}
					<section className="add-offer">
						<h1 className="add-offer__title">{id ? "Update apartment" : "Add new apartment"}</h1>
						<OfferForm />
					</section>
				</div>
			</main >
			<Footer />
		</div >
	);
};
