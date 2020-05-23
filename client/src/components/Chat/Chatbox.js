import React, { useState, useEffect, useRef } from 'react';
import { Form, FormText, Input, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Message from './Message';

let socket;
const Chatbox = ({ onClose, user }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const { classroomID } = useParams();
  const ENDPOINT = 'localhost:5000';
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('join', { classroomID }, messagesFromServer => {
      setMessages(messagesFromServer);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, classroomID]);
  useEffect(() => {
    socket.on('newMessage', newMessages => {
      setMessages([...newMessages]);
    });
    const element = messageRef.current;
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }, [messages]);
  const handleSubmit = e => {
    e.preventDefault();
    setMessage('');
    socket.emit(
      'message',
      { msg: message, userId: user.id, classroomID },
      newMessage => {
        setMessages([...messages, newMessage]);
      }
    );
    setMessage('');
  };
  return (
    <div className="chatbox-container">
      <div className="chatbox-header" onClick={onClose}>
        <button type="button" onClick={() => onClose()}>
          <i>&#10005;</i>
        </button>
      </div>
      <div className="messages">
        <ul className="messageContainer" ref={messageRef}>
          {messages.map(mes => (
            <Message
              key={mes._id}
              text={mes.content}
              isUserMessage={mes.author === user.id}
            />
          ))}
        </ul>
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
const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  classes: state.user_class.classes
});
export default connect(mapStateToProps, null)(Chatbox);
