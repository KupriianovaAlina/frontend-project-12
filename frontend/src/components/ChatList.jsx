import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { openModal } from '../slices/modalSlice';

const ChatList = (props) => {
  const { channels, setCurrentChat, currentChat } = props;
  const dispatch = useDispatch();

  return (
    <ul className="nav nav-pills list-group">
      {channels.map((channel, index) => {
        const btnClass = cn({
          'rounded-0 text-start btn': true,
          'btn-secondary': currentChat.id === channel.id,
        });
        const variant = (currentChat.id === channel.id) ? 'secondary' : '';

        return (
          <li key={index} className="nav-item d-grid">
            <ButtonGroup>
              <button type="button" className={btnClass} onClick={() => setCurrentChat(channel)}>
                <span className="me-1">#</span>
                {channel.name}
              </button>
              {channel.removable && (
                <DropdownButton as={ButtonGroup} id="bg-nested-dropdown" variant={variant} title="">
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => {
                      dispatch(openModal({ type: 'removing', chatId: channel.id }));
                    }}
                  >
                    Удалить
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => {
                      dispatch(openModal({ type: 'renaming', chatId: channel.id }));
                    }}
                  >
                    Переименовать
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
