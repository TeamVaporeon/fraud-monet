/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
// import './StartModal.css';

const StartModal = ({ setOpenStart }) => {
  // const [d, setD] = useState(null);
  return (
    <div className='startModal'>
      <div className='startContainer'>Round N Start</div>
      <button onClick={() => setOpenStart(false)}>X</button>
    </div>
  );
};

export default StartModal;
