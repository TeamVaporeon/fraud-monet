/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import './UsernameModal.css';
import { AppContext } from '../../../App';

const UsernameModal = ({ setOpenUsername }) => {
  const [paramsBody, setParamsBody] = useState({});
  const { socket } = useContext(AppContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    const temp = {};
    temp[name] = value;
    setParamsBody(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.auth = {
      user: {
        username: paramsBody.username,
        roomID: window.location.pathname,
        color: '#000',
        host: false,
        fraud: false,
        role: 'spectator',
        score: 0,
      },
    };
    let sessionID = localStorage.getItem('sessionID');
    socket.connect();
    socket.auth.sessionID = sessionID;
    socket.emit('joinRoom', window.location.pathname);
    setOpenUsername(false);
  };

  return (
    <div className='usernameModal'>
      <div className='usernameContainer'>
        <form className='usernameForm' onSubmit={handleSubmit}>
          <label className='usernameLabel'>Username:</label>
          <input
            className='usernameInput'
            placeholder='Please fill in...'
            name='username'
            onChange={handleInputChange}
            required
          ></input>
          <button className='usernameSubmit' type='submit' value='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
