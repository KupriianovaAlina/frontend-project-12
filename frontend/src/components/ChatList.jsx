import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import uuid from 'react-uuid';
import { useTranslation } from 'react-i18next';
import { openModal } from '../slices/modalSlice';

const ChatList = (props) => {
  const { channels, setCurrentChat, currentChat } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <ul className="nav nav-pills list-group">
      {channels.map((channel) => {
        const btnClass = cn({
          'rounded-0 text-start btn': true,
          'btn-secondary': currentChat.id === channel.id,
        });
        const variant = (currentChat.id === channel.id) ? 'secondary' : '';

        return (
          <li key={uuid()} className="nav-item d-grid">
            <ButtonGroup>
              <button type="button" className={btnClass} onClick={() => setCurrentChat(channel)}>
                <span className="me-1">#</span>
                {channel.name}
              </button>
              {channel.removable && (
                <DropdownButton as={ButtonGroup} id="bg-nested-dropdown" variant={variant} title="">
                  <span className="visually-hidden">{"Управление каналом"}</span>
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
                </DropdownButton>
              )}
            </ButtonGroup>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatList;
