import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import './CreateRoom.css';

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
  autoConnect: false,
});

var CreateRoom = (props) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const routeChange = (e) => {
    e.preventDefault();
      if(name.length > 0){
        const roomID = generateRandString();
        hostSocket.auth = {
          user: {
            username: name,
            roomID: `/${roomID}`,
            color: '#000',
            host: true,
            fraud: false,
            role: 'spectator',
            score: 0,
          },
        };
        hostSocket.connect();
        hostSocket.emit('joinRoom', `/${roomID}`);
        hostSocket.on('hostConnected', () => {
          navigate(`/${roomID}`);
        });
    }
  };

  return (
    <div className='CreateGamePage'>
      <h1>Fraud Monet</h1>
      <div className='FormBox'>
        <h2>Username</h2>
        <form>
        <input
          className='UserNameForm'
          type='text'
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === 'Enter' && routeChange(e);
          }}
          required
        /><br/>
        <br/>
        <button className='CreateButton' onSubmit={routeChange}>
          Create Game
        </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
