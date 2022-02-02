import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

var generateRandString = () => {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const hostSocket = io({
  withCredentials: true,
  autoConnect: false
});

var CreateRoom = (props) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const routeChange = (e) => {
    e.preventDefault();
    const roomID = generateRandString();
    hostSocket.auth = {
      user: {
        username: name,
        roomID: `/${roomID}`,
        color: '#000',
        host: true,
        fraud: false,
        role: 'player',
        score: 0
      }
    };
    const sessionID = localStorage.getItem('sessionID');
    if (sessionID) {
      hostSocket.auth.sessionID = sessionID;
    }
    hostSocket.connect();
    hostSocket.emit('joinRoom', `/${roomID}`);
    hostSocket.on('hostConnected', () => {
      navigate(`/${roomID}`);
    });
  };

  return (
    <div>
      <form>
        <label>
          Enter Your Username:
          <input type='text' onChange={(e) => { setName(e.target.value); }} />
          <button onClick={routeChange} >Create Room</button>
        </label>
      </form>
    </div>
  );
};

export default CreateRoom;