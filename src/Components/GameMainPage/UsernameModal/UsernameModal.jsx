/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './UsernameModal.css';

const UsernameModal = ({ setPlayerUsername, setOpenUsername }) => {
  return (
    <div className='usernameModal'>
      <div className='usernameContainer'>
        <form className='usernameForm'>
          <label>Username:</label>
          <input
            className='usernameForm_input'
            placeholder='Please leave your username before enter the game...'
            name='usernameForm_name'
          ></input>
          <button
            className='usernameForm_submit'
            onClick={() => {
              setOpenUsername(false);
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameModal;
