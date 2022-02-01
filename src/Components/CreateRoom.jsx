import React, { useState, useContext } from 'react';
import AppContext from '../App.jsx';
import { io } from 'socket.io-client';
import { Link, useNavigate } from 'react-router-dom';


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

  let navigate = useNavigate();
  return (
    <div>
      <form>
        <label>
          Enter Your Username:
          <input
            type='text'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            type='submit'
            className='start-game-button'
            text='Create Room'
            onClick={(e) => {
              e.preventDefault();
              var idString = generateRandString();
              socket.emit('createRoom', {
                username: name,
                roomId: idString,
                color: '#000',
                host: true,
                fraud: false,
                role: 'player',
              }, () => {
                navigate(idString);
              });
            }}
          >
            Create Room{' '}
          </button>
        </label>
      </form>
      <Link to='/play'>Play</Link>
    </div>
  );
};

export default CreateRoom;
