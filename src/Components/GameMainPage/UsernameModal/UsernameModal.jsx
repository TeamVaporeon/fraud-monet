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
        score: 0
      }
    };
    socket.connect();
    socket.emit('joinRoom', window.location.pathname);
    setOpenUsername(false);
  };

  return (
    <div className='usernameModal'>
      <div className='usernameContainer'>
        <form className='usernameForm' onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            className='usernameForm_input'
            placeholder='Please fill in...'
            name='username'
            onChange={handleInputChange}
          ></input>
          <button className='usernameForm_submit' type='submit' value='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
