import { Navigate } from "react-router-dom";
import { PrivateRouteProps } from "./types/types";

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return localStorage.getItem("access_token") ? (
    children
  ) : (
    <Navigate to="/auth/login" />
  );
};
