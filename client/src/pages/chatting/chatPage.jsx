// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import './chatPage.css'; // Import your CSS for styling

const socket = io('http://localhost:3001'); // Ensure this URL matches your backend URL

function Chat({ username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage.trim() !== '') {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date().toLocaleTimeString(),
      };

      await socket.emit('send_message', messageData);
      setMessageList((prev) => [...prev, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message', (data) => {
      setMessageList((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [room]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Live Chat</h2>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((msg, index) => (
            <div
              key={index}
              className={`message ${username === msg.author ? 'you' : 'other'}`}
            >
              <div className="message-content">
                <p>{msg.message}</p>
              </div>
              <div className="message-meta">
                <p className="time">{msg.time}</p>
                <p className="author">{msg.author}</p>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type a message..."
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
