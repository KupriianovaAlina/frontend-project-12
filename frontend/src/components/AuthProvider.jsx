import { createContext, useState } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const getToken = () => localStorage.getItem('token');

  const [isAuthtoraized, setAuth] = useState(Boolean(getToken()));

  const logIn = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setAuth(true);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthtoraized, logIn, logOut, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
