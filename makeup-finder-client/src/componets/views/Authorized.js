import { Navigate, Outlet } from "react";

export const Authorized = ({ token }) => {
  if (token) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
