import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../slices/modalSlice';
import { channelSelector } from '../slices/channelSlice';
import socket from '../utilits/socket.js';

const Add = () => {
  const [creationFailed, setCreationFailed] = useState(false);
  const channels = useSelector(channelSelector.selectAll);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef();

  const formik = useFormik({
    onSubmit: () => {
      if (channels.some((channel) => channel.name === formik.values.name)) {
        setCreationFailed(true);
        return;
      }
      try {
        inputRef.current.disabled = true;
        setCreationFailed(false);
        socket.emit('newChannel', { name: formik.values.name });
        formik.values.name = '';
        toast.success(t('toasts.success.newChanneladded'));
        dispatch(closeModal(modal));
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setCreationFailed(true);
          toast.error(t('toasts.error.network'));
          inputRef.current.select();
          return;
        }
        throw err;
      } finally {
        inputRef.current.disabled = false;
      }
    },
    initialValues:
      { name: '' },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => { dispatch(closeModal(modal)); }}>
        <Modal.Title>{t('modal.header.adding')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control required ref={inputRef} onChange={formik.handleChange} value={formik.values.name} name="name" isInvalid={creationFailed} />
            <Form.Control.Feedback type="invalid">{t('modal.errorUnique')}</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex flex-row-reverse mt-3 gap-2">
            <Button variant="primary" type="submit">
              {t('modal.button.save')}
              <span className="visually-hidden">Имя канала</span>
            </Button>
            <Button variant="secondary" onClick={() => { dispatch(closeModal(modal)); }}>{t('modal.button.cancel')}</Button>
          </div>
        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default Add;
