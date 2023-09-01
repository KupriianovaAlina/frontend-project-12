import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useRef } from 'react';
import socket from '../utilits/socket';
import i18next from '../utilits/i18n';
import { filter } from 'leo-profanity';

const MessageInput = (props) => {
  const { inputRef, currentChat } = props;
  const username = localStorage.getItem("username");

  const buttonRef = useRef();

  const formik = useFormik({
    initialValues: {
      newMessage: ''
    },
    onSubmit: ({ newMessage }) => {
      buttonRef.current.style.disabled = true;
      try {
        const body = filter.clean(newMessage);
        formik.values.newMessage = '';
        inputRef.current.focus();
        socket.emit('newMessage', { body, channelId: currentChat.id, username });
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        buttonRef.current.style.disabled = false;
      }
    }
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <Form.Group className="input-group has-validation">
          <Form.Control
            name="newMessage"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.newMessage}
            placeholder={i18next.t('privatePage.newMessage')}
            ref={inputRef}
            className="border-0 p-0 ps-2 form-control"
          />
          <button type="submit" className="btn btn-group-vertical" ref={buttonRef}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
            </svg>
            <span className="visually-hidden"></span>
          </button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default MessageInput;