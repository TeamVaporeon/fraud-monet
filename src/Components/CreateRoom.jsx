import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    }).then((res) => {
      // setUsers(res.data);
    })
    navigate(`/${roomID}`)

    // socket.emit('createRoom', {
    //   username: name,
    //   roomID,
    //   color: '#000',
    //   host: true,
    //   fraud: false,
    //   role: 'player',
    // })
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