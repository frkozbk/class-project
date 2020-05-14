import React, { useState, useEffect } from 'react';
import { Form, FormText, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

let socket;
const Chatbox = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const { classroomID } = useParams();
  const ENDPOINT = 'localhost:5001';
  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT, classroomID]);
  const handleSubmit = e => {
    e.preventDefault();
    setMessage('');
    console.log(message);
  };
  return (
    <div className="chatbox-container">
      <div className="chatbox-header" onClick={onClose}>
        <button type="button" onClick={() => onClose()}>
          <i>&#10005;</i>
        </button>
      </div>
      <div className="messages">
        <Form className="message-input" onSubmit={e => handleSubmit(e)}>
          <Input
            type="text"
            className="input"
            placeholder="Mesajınızı giriniz..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button type="submit">Gönder</Button>
        </Form>
      </div>
    </div>
  );
};

export default Chatbox;
