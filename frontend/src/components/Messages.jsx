const Messages = (props) => {
  const { currentMessages } = props;

  return (
    <div className="px-5">
      {currentMessages.map((message, index) => (
        <div className="text-break mb-2 px-5" key={index}>
          <b>{message.username}</b>
          {': '}
          <span>{message.body}</span>
        </div>
      ))}
    </div>
  );
};

export default Messages;
