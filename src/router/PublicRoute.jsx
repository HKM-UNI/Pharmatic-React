import { AuthContext } from "@/auth";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children, onLogged = "/" }) {
  const { logged } = useContext(AuthContext);

  return logged ? <Navigate to={onLogged} /> : children;
}
