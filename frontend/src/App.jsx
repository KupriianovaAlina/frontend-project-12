import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/index.js';
import PrivatePage from './components/PrivatePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import NotFound from './components/NotFound';
import AuthProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import 'react-toastify/dist/ReactToastify.css';
import {
  addChannel, removeChannel, renameChannel,
} from './slices/channelSlice';
import { addMessage } from './slices/messageSlice';
import socket from './utilits/socket.js';
import rollbarConfig from './utilits/rollbarConfig.js';

const App = () => {
  // подписываемся на события с сервера
  useEffect(() => {
    socket.on('newMessage', (payload) => {
      store.dispatch(addMessage(payload));
    });
    socket.on('removeChannel', (payload) => {
      store.dispatch(removeChannel(payload.id));
    });
    socket.on('newChannel', (payload) => {
      store.dispatch(addChannel(payload));
      // setCurrentChat(payload);
    });
    socket.on('renameChannel', (payload) => {
      store.dispatch(renameChannel({ id: payload.id, changes: payload }));
    });
  }, []);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <AuthProvider>
            <BrowserRouter>
              <Header />
              <ToastContainer />
              <Routes>
                <Route
                  path="/"
                  element={(
                    <PrivateRoute>
                      <PrivatePage />
                    </PrivateRoute>
                  )}
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default App;
