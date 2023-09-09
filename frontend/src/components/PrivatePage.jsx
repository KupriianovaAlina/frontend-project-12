import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  useEffect, useRef, useState, useContext,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container, Col, Stack, Row,
} from 'react-bootstrap';
import getModal from '../modals/index';
import { AuthContext } from './AuthProvider';
import { openModal } from '../slices/modalSlice';
import {
  addChannels, addChannel, channelSelector, removeChannel, renameChannel,
} from '../slices/channelSlice';
import { addMessages, addMessage, messageSelector } from '../slices/messageSlice';
import ChatList from './ChatList.jsx';
import MessageInput from './MessageInput.jsx';
import Messages from './Messages.jsx';
import socket from '../utilits/socket';

const getChatData = (token) => axios.get('/api/v1/data', { headers: { Authorization: `Bearer ${token}` } });

const renderModal = (modal, setCurrentChat, channels) => {
  if (!modal.type) return null;
  const Component = getModal(modal.type);
  return <Component setCurrentChat={setCurrentChat} channels={channels} />;
};

const PrivatePage = () => {
  const auth = useContext(AuthContext);
  const messages = useSelector(messageSelector.selectAll);
  const channels = useSelector(channelSelector.selectAll);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [currentChat, setCurrentChat] = useState({});
  const { t } = useTranslation();

  // изначальная загрузка каналов
  useEffect(() => {
    inputRef.current.focus();
    const uploadInitialData = async () => {
      const { data } = await getChatData(auth.getToken());
      dispatch(addChannels(data.channels));
      dispatch(addMessages(data.messages));
      // eslint-disable-next-line no-shadow
      const [currentChat] = data.channels.filter((chat) => chat.id === data.currentChannelId);
      setCurrentChat(currentChat);
    };
    try {
      uploadInitialData();
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, auth]);

  // подписываемся на события с сервера
  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
      setCurrentChat(payload);
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel({ id: payload.id, changes: payload }));
    });
  }, [dispatch]);

  const currentMessages = messages.filter((message) => message.channelId === currentChat.id);

  return (
    <Container>
      <Row>
        <Col xs lg="3">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('privatePage.channels')}</b>
            <button type="button" onClick={() => { dispatch(openModal({ type: 'adding' })); }} className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ChatList channels={channels} setCurrentChat={setCurrentChat} currentChat={currentChat} />
        </Col>
        <Col>
          <Stack>
            <div className="bg-light mb-3 p-3 shadow-sm small">
              <p>
                <b>
                  #
                  {currentChat.name}
                </b>
              </p>
              <span className="text-muted">{t('privatePage.messager.message', { count: currentMessages.length })}</span>
            </div>
            <Messages currentMessages={currentMessages} />
            <MessageInput inputRef={inputRef} currentChat={currentChat} />
          </Stack>
        </Col>
      </Row>
      {renderModal(modal, setCurrentChat, channels)}
    </Container>
  );
};

export default PrivatePage;
