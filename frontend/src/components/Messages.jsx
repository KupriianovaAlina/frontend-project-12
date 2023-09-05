const Messages = (props) => {
  const { currentMessages } = props;

  return (
    <div className="px-5" id="messages-box">
      {currentMessages.map((message, index) => (
        <div className="mb-2" key={index}>
          <b>{message.username}</b>
          {': '}
          {message.body}
        </div>
      ))}
    </div>
  );
};

export default Messages;
