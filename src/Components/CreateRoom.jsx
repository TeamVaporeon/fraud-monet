import React, { useState, useContext } from 'react';
import AppContext from '../App.jsx';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

const getHome = async () => {
  const response = await fetch('http://localhost:8080');
};
getHome();
var socket = io();
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

var CreateRoom = (props) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const routeChange = () => {
    const roomID = generateRandString();
    socket.emit('createRoom', {
      username: name,
      roomID,
      color: '#000',
      host: true,
      fraud: false,
      role: 'player',
    })
    navigate(`/${roomID}`)
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