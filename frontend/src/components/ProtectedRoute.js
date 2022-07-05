import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";

const ProtectedRoute = ({ loggedIn, children, userAuth }) => {
  return userAuth ? (
      <Loader />
  ) : loggedIn ? (
    children
  ) : (
    <Navigate to="./signin" />
  );
};

export default ProtectedRoute;
