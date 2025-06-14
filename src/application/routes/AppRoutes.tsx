import React, { useContext } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { authRoutes, publicRoutes, RouteNames } from "./routes";
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const AppRoutes = () => {
  const { userStore } = useContext(Context);
  const location = useLocation();

  const isTryingToAccessExchanger =
    location.pathname === RouteNames.EXCHANGER_ROUTE;

  return (
    <Routes>
      {userStore.isAuth &&
        authRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      {!userStore.isAuth && isTryingToAccessExchanger && (
        <Route
          path={RouteNames.EXCHANGER_ROUTE}
          element={<Navigate to={RouteNames.AUTH_ROUTE} replace />}
        />
      )}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to={RouteNames.AUTH_ROUTE} />} />
    </Routes>
  );
};

export default observer(AppRoutes);
