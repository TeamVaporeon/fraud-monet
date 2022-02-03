/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './FinalResultsModal.css';
import { AppContext } from '../../../App';

const FinalResultsModal = ({ setOpenFinal }) => {
  const { round, setRound, socket, users } = useContext(AppContext);
  return (
    <div className='finalModal'>
      <div className='finalContainer'>
        <h3 className='finalTitle'>Final Results:</h3>

        <div className='finalScore'>
          <div className='finalText'>Real Fraud Monet: Playername</div>
          <table>PlayerScore List or Table</table>
        </div>
        <button
          className='finalCloseBtn'
          onClick={() => {
            setOpenFinal(false);
            setRound(0);
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default FinalResultsModal;
