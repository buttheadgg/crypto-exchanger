import Exchanger from "../pages/Exchanger/Exchanger";

export enum RouteNames {
  EXCHANGER_ROUTE = "/exchanger",
  HOME_ROUTE = "",
}

export const publicRoutes = [
  {
    path: RouteNames.EXCHANGER_ROUTE,
    element: Exchanger,
  },
  {
    path: RouteNames.EXCHANGER_ROUTE,
    element: Exchanger,
  },
];
