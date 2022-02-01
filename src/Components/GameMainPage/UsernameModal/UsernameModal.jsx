/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios';
import './UsernameModal.css';
import { AppContext } from '../../../App';

const UsernameModal = ({ setOpenUsername }) => {
  const [paramsBody, setParamsBody] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { playerUsername, setPlayerUsername } = useContext(AppContext);

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
    setPlayerUsername(paramsBody.username);
    setSubmitted(true);
    document.getElementsByClassName('usernameForm').reset();
    // // can send paramsBody aka invited user's username input to server
  };
  return (
    <div className='usernameModal'>
      <div className='usernameContainer'>
        <form className='usernameForm' onSubmit={(e) => handleSubmit(e)}>
          <label>Username:</label>
          <input
            className='usernameForm_input'
            placeholder='Please fill in...'
            name='username'
            onChange={(e) => handleInputChange(e)}
          ></input>
          <button className='usernameForm_submit' type='submit' value='submit'>
            Submit
          </button>
        </form>
        {submitted ? (
          <div className='confirm'>
            <p>
              You will enter the game room as <b>{playerUsername}</b>
            </p>
            <p>
              Click 'Join' in the 'Player List' to join the game as a player
            </p>
            <p>Otherwise, you will watch the whole game as a spectator</p>
            <button
              onClick={() => {
                setSubmitted(false);
                setOpenUsername(false);
              }}
            >
              Confirm
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UsernameModal;
