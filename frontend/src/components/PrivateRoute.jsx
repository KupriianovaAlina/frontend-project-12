import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const PrivateRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    auth.isAuthtoraized ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default PrivateRoute;
