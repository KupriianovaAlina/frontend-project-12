import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useLocation, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    auth.isAuthtoraized ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;