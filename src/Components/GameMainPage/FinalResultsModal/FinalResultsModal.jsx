/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './FinalResultsModal.css';

const FinalResultsModal = ({ setOpenFinal }) => {
  // const [d, setD] = useState(null);
  return (
    <div className='finalModal'>
      <div className='finalContainer'>
        Final Results
        <button onClick={() => setOpenFinal(false)}>X</button>
      </div>
    </div>
  );
};

export default FinalResultsModal;
