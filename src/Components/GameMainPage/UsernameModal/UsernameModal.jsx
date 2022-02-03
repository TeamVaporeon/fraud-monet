/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './UsernameModal.css';
import { AppContext } from '../../../App';

const UsernameModal = ({ setOpenUsername }) => {
  const { users, socket } = useContext(AppContext);
  const [currentUsernames, setCurrentUsernames] = useState({});
  const [nameTaken, setNameTaken] = useState(false);
  const [username, setUsername] = useState('');
  const room = window.location.pathname;

  // const handleInputChange = (e) => {
  //   e.preventDefault();
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   const temp = {};
  //   temp[name] = value;
  //   setParamsBody(temp);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    if (!currentUsernames[username]) {
      socket.auth = {
        user: {
          username: username,
          roomID: room,
          color: '#000',
          host: false,
          fraud: false,
          role: 'spectator',
          score: 0,
        },
      };
      socket.connect();
      socket.emit('joinRoom', room);
      setOpenUsername(false);
    } else {
      setUsername(username);
      setNameTaken(true);
    };
  };

  useEffect(() => {
    axios.get(`/usernames${room}`)
      .then(usernames => {
        setCurrentUsernames(usernames.data);
      })
      .catch(err => console.log(err.message));
  }, [])

  return (
    <div className='usernameModal'>
      <div className='usernameContainer'>
        <form className='usernameForm' onSubmit={handleSubmit}>
          <label className='usernameLabel'>Username:</label>
          <input
            className='usernameInput'
            placeholder='Please fill in...'
            name='username'
            required
          ></input>
          {nameTaken &&
            <label className='nameTaken'>
              {username} is taken
            </label>
          }
          <button className='usernameSubmit' type='submit' value='submit'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
