import Exchanger from "../pages/Exchanger/Exchanger";
import Pools from "../pages/Pools/Pools";



export enum RouteNames {
  POOLS_ROUTE = "/pools",
  EXCHANGER_ROUTE = '/exchanger',
}

export const publicRoutes = [
  {
    path: RouteNames.POOLS_ROUTE,
    element: Pools,
  },
  {
    path: RouteNames.EXCHANGER_ROUTE,
    element: Exchanger,
  },
]; 