import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivatePage from './components/PrivatePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage'
import NotFound from './components/NotFound';
import AuthProvider from './components/AuthProvider';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: 'ddaae6b2c7e74db09c99ed6cf78bbf2c',
  environment: 'testenv',
};

function TestError() {
  const a = null;
  return a.hello();
}

function App() {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
        <Provider store={store}>
          <AuthProvider>
            <BrowserRouter>
              <Header />
              <ToastContainer />
              <Routes>
                <Route path="/" element={
                  <PrivateRoute>
                    <PrivatePage />
                  </PrivateRoute>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  )
};

export default App;
