import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../slices/modalSlice';
import { channelSelector } from '../slices/channelSlice';
import socket from '../utilits/socket.js';

const Rename = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);
  const channels = useSelector(channelSelector.selectAll);
  const [renamingFailed, setRenamingFailed] = useState(false);
  const { t } = useTranslation();

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const formik = useFormik({
    onSubmit: () => {
      if (channels.some((channel) => channel.name === formik.values.newName)) {
        setRenamingFailed(true);
        return;
      }

      try {
        setRenamingFailed(false);
        socket.emit('renameChannel', { id: modal.chatId, name: formik.values.newName });
        toast.success(t('toasts.success.channelRenamed'));
        dispatch(closeModal(modal));
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          toast.error(t('toasts.error.network'));
          setRenamingFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
    initialValues: { newName: channels.find((channel) => channel.id === modal.chatId).name },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => { dispatch(closeModal(modal)); }}>
        <Modal.Title>{t('modal.header.renaming')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <Form.Control required ref={inputRef} onChange={formik.handleChange} value={formik.values.newName} name="newName" isInvalid={renamingFailed} />
            <Form.Control.Feedback type="invalid">{t('modal.errorUnique')}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex flex-row-reverse mt-3 gap-2">
            <Button variant="primary" type="submit">
              {t('modal.button.save')}
            </Button>
            <Button variant="secondary" onClick={() => { dispatch(closeModal(modal)); }}>{t('modal.button.cancel')}</Button>
          </div>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default Rename;
