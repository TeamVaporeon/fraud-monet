import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:8080');

const Chat = ({ socket, room, username }) => {
  const [currentMsg, setCurrentMsg] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMsg !== '') {
      const messageDetails = {
        room,
        author: username,
        message: currentMsg,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageDetails);
      setMessageList((list) => [...list, messageDetails]);
      setCurrentMsg('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (receivedMessage) => {
      setMessageList((list) => [...list, receivedMessage]);
    })
  }, [socket]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((content) => {
            return (
              <div className="message" id={username === content.author ? "you" : "other"}>
                <div className="message-content">
                  <p>{content.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{content.time}</p>
                  <p id="author">{content.author}</p>
                </div>
              </div>
            )
          })}
        </ScrollToBottom>
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={currentMsg}
          placeholder="Message..."
          aria-label="Message..."
          autoComplete="off"
          onChange={(event) => { setCurrentMsg(event.target.value); }}
          onKeyPress={(event) => { event.key === "Enter" && sendMessage(); }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;