import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Chat.css';

const Chat = ({ socket, currentUser }) => {
  // const [currentMsg, setCurrentMsg] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [username, setUsername] = useState('Anonymous');

  const sendMessage = async () => {
    let currentMsg = document.getElementById('message-input').value;
    if (currentMsg !== '') {
      const mins = new Date(Date.now()).getMinutes();
      const additionalZero = mins < 10 ? '0' : '';
      const messageDetails = {
        author: username,
        message: currentMsg,
        time: new Date(Date.now()).getHours() + ':' + additionalZero + mins,
      };

      await socket.emit('send_message', messageDetails);
      // setMessageList((list) => [...list, messageDetails]);
      document.getElementById('message-input').value = '';
      // setCurrentMsg('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (receivedMessage) => {
      setMessageList((list) => [...list, receivedMessage]);
    });

    socket.on('messages_for_new_users', (messages) => {
      setMessageList(messages);
    });

    socket.on('user_object', (user) => {
      setUsername(user.username);
    });
  }, [socket]);

  return (
    <div className='chat-container'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>

      <div className='chat-body'>
        <ScrollToBottom className='message-container'>
          {messageList.map((content, index) => {
            return (
              <div
                className='message'
                key={3 * index}
                id={username === content.author ? 'you' : 'other'}
              >
                <div className="message-content">
                  <p>{content.message}</p>
                </div>
                <div className='message-meta'>
                  <p id='time'>{content.time}</p>
                  <p id='author'>{content.author}</p>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <div className='chat-footer'>
        <input
          id='message-input'
          type='text'
          placeholder={currentUser.role === 'spectator'
            ? 'Chat disabled! Join game to enable.'
            : 'Message...'
          }
          aria-label='Message...'
          autoComplete='off'
          disabled={currentUser.role === 'spectator' ? true : false}
          onKeyPress={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        {
          currentUser.role !== 'spectator' &&
          <button onClick={sendMessage}>&#9658;</button>
        }
      </div>
    </div>
  );
};

export default Chat;
