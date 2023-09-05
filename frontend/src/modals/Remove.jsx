import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../slices/modalSlice';
import socket from '../utilits/socket.js';

const Remove = (props) => {
  const { setCurrentChat, channels } = props;
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const { t } = useTranslation();

  const submitRemoval = () => {
    try {
      socket.emit('removeChannel', { id: modal.chatId });
      setCurrentChat(channels[0]);
      toast.success(t('toasts.success.channelRemoved'));
      dispatch(closeModal(modal));
    } catch (err) {
      toast.error(t('toasts.error.network'));
    }
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => { dispatch(closeModal(modal)); }}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted">Уверены?</p>
        <div className="d-flex flex-row-reverse mt-3 gap-2">
          <Button variant="danger" type="submit" onClick={submitRemoval}>Удалить</Button>
          <Button variant="secondary" onClick={() => { dispatch(closeModal(modal)); }}>Отменить</Button>
        </div>
      </Modal.Body>

    </Modal>
  );
};

export default Remove;
