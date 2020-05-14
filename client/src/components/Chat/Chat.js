import React, { useState, useEffect } from 'react';
import Chatbox from './Chatbox';
import 'styles/chat.scss';

const Chat = () => {
  const [showMessage, setShowMessage] = useState(false);
  return (
    <>
      {showMessage && <Chatbox onClose={() => setShowMessage(false)} />}
      <button
        type="button"
        className="chatButton"
        onClick={() => setShowMessage(!showMessage)}
      >
        {!showMessage ? 'Mesajları Göster' : 'Mesajları Sakla'}
      </button>
    </>
  );
};

export default Chat;
