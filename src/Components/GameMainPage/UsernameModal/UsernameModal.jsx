/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios';
import './UsernameModal.css';

const UsernameModal = ({ setPlayerUsername, setOpenUsername }) => {
  const [paramsBody, setParamsBody] = useState({});
  const handleInputChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setParamsBody({ name: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerUsername(Object.values(paramsBody)[0]);
    // // Send paramsBody aka invited user's username input to server
    // axios
    //   .post('whateverendppoint', paramsBody)
    //   .then((res) => {
    //     document.getElementById('addForm').reset();
    //     setParamsBody({});
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <div className='usernameModal'>
      <div className='usernameContainer'>
        <form
          className='usernameForm'
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <label>Username:</label>
          <input
            className='usernameForm_input'
            placeholder='Please leave your username before enter the game...'
            name='username'
            onChange={(e) => handleInputChange(e)}
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
