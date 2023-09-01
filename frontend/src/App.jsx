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

function App() {
  return (
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
  )
};

export default App;
