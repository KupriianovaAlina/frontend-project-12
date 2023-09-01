import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider.jsx';
import AuthButton from './AuthButton.jsx'
import { useTranslation } from 'react-i18next';


const Header = () => {
  const auth = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to="/">{t('header')}</Navbar.Brand>
        {auth.isAuthtoraized && <AuthButton />}
      </div>
    </Navbar>)
}

export default Header;