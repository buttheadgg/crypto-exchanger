import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LOGIN_ROUTE } from "../constants";
import { Context } from "../..";

export const PrivateRoute = observer(({ children }: { children: JSX.Element }) => {
  const { userStore } = useContext(Context);

  if (!userStore.isAuth) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  return children;
});

export default PrivateRoute;
