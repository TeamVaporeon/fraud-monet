import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateRoom.css'

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
    <div className="CreateGamePage">
      <h1>Fraud Monet</h1>
      <div className="FormBox">

        <div>Enter Your Username:</div>
        <input className="UserNameForm" type='text' onChange={(e) => { setName(e.target.value); }} />
        <button className="CreateButton" classonClick={routeChange} >Create Game</button>


      </div>
    </div>
  );
};

export default CreateRoom;