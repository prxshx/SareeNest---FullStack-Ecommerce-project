import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, isAdmin } from "../Util/auth";

const PrivateRoute = ({ children, adminOnly = false, userOnly = false }) => {

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/user-dashboard" />;
  }

  if (userOnly && isAdmin()) {
    return <Navigate to="/addProduct" />;
  }

  return children;
};

export default PrivateRoute;