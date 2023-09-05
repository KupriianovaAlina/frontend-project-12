const Messages = (props) => {
  const { currentMessages } = props;

  return (
    <div className="px-5">
      {currentMessages.map((message, index) => (
        <div key={index}>
          <div className="text-break mb-2">
            <b>{message.username}</b>
            :
            {' '}
            {message.body}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
