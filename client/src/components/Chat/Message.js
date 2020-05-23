import React from 'react';

const Message = ({ isUserMessage, text }) => {
  return (
    <li className={`message ${isUserMessage ? 'userMessage' : ''}`}>
      <div className="message-container">{text}</div>
    </li>
  );
};

export default Message;
