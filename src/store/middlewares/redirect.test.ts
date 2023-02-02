import { configureMockStore } from "@jedmao/redux-mock-store";
import { AnyAction } from "redux";
import { redirectToRoute } from "../actions";
import { redirect } from "./redirect";
import { AppRoute } from "../../const";
import { RootState } from "../../types/state";

const fakeHistory = {
	location: { pathname: "" },
	push(path: string) {
		this.location.pathname = path;
	},
};

jest.mock("../../utils/browserHistory", () => ({
	browserHistory: fakeHistory,
}));

const middlewares = [redirect];
const mockStore = configureMockStore<RootState, AnyAction>(middlewares);
const store = mockStore();

describe("Middleware: redirect", () => {
	beforeEach(() => {
		fakeHistory.push("");
	});

	it("should be redirect to /login", () => {
		store.dispatch(redirectToRoute(AppRoute.LOGIN));
		expect(fakeHistory.location.pathname).toBe(AppRoute.LOGIN);
		expect(store.getActions()).toEqual([redirectToRoute(AppRoute.LOGIN)]);
	});

	it("should not to be redirect /favorites because bad action", () => {
		store.dispatch({ type: "UNKNOWN_ACTION", payload: AppRoute.FAVORITES });
		expect(fakeHistory.location.pathname).not.toBe(AppRoute.FAVORITES);
	});
});
