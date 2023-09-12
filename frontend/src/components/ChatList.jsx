import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { useTranslation } from 'react-i18next';
import { openModal } from '../slices/modalSlice';

const ChatList = (props) => {
  const { channels, setCurrentChat, currentChat } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <ul className="nav flex-column px-2 overflow-auto h-100">
      {channels.map((channel) => {
        const variant = (currentChat.id === channel.id) ? 'secondary' : 'light';
        return (
          <Dropdown className="shadow-none" as={ButtonGroup} key={uuid()}>
            <Button variant={variant} className="w-100 rounded-0 text-start btn text-truncate" onClick={() => setCurrentChat(channel)}>
              <span className="me-1">#</span>
              {channel.name}
            </Button>
            {
              channel.removable
              && <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" />
            }
            <Dropdown.Menu>
              <Dropdown.Item
                eventKey="1"
                onClick={() => {
                  dispatch(openModal({ type: 'removing', chatId: channel.id }));
                }}
              >
                {t('modal.button.remove')}
                <span className="visually-hidden">Удалить</span>
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={() => {
                  dispatch(openModal({ type: 'renaming', chatId: channel.id }));
                }}
              >
                {t('modal.button.rename')}
                <span className="visually-hidden">Переименовать</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
      })}
    </ul>
  );
};

export default ChatList;
