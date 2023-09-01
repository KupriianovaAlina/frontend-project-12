import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider.jsx';
import AuthButton from './AuthButton.jsx'

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        {auth.isAuthtoraized && <AuthButton />}
      </div>
    </Navbar>)
}

export default Header;