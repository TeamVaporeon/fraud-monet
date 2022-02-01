import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

<<<<<<< HEAD
// const getHome = async () => {
//   const response = await fetch('http://localhost:8080');
//   console.log(response);
// }
// getHome();

// Connect client's socket to server
const socket = io();
// Get the room id
console.log(window.location.pathname);
// Emit the room id to the server so client can be put in a room
socket.emit('room', window.location.pathname);
=======
>>>>>>> main
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
  const routeChange = (e) => {
    e.preventDefault();
    const roomID = generateRandString();
    const userInfo = {
      username: name,
      roomID,
      color: '#000',
      host: true,
      fraud: false,
      role: 'player',
      score: 0
    }
    axios.post(`/`, userInfo, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((data) => {
        console.log(data);
        navigate(`/${roomID}`);
      })
      .catch(err => console.log('ERROR', err.message));
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