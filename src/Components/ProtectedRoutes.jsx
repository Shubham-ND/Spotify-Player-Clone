import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  console.log("protected");
  return localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoutes;
