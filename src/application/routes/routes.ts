import Auth from "../pages/Auth/Auth";
import Exchanger from "../pages/Exchanger/Exchanger";
import PrivateRoute from "./PrivateRoute";

export enum RouteNames {
  EXCHANGER_ROUTE = "/exchanger",
  AUTH_ROUTE = "/auth",
  HOME_ROUTE = "",
}

export const authRoutes = [
  {
    path: RouteNames.EXCHANGER_ROUTE,
    element: Exchanger,
  },
];

export const publicRoutes = [
  {
    path: RouteNames.HOME_ROUTE,
    element: Auth,
  },
  {
    path: RouteNames.AUTH_ROUTE,
    element: Auth,
  },
];
