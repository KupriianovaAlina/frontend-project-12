import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import i18next from '../utilits/i18n';
import { AuthContext } from './AuthProvider';

const AuthButton = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  return (
    auth.isAuthtoraized
      ? <Button onClick={auth.logOut}>{i18next.t('authButton.logOut')}</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>{i18next.t('authButton.logIn')}</Button>
  );
};

export default AuthButton;
