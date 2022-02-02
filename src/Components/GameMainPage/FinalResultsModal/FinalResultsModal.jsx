/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import { AppContext } from '../../../App.jsx';
import './FinalResultsModal.css';

const FinalResultsModal = ({ setOpenFinal }) => {
  const { users } = useContext(AppContext);
  const players = users.filter((user) => user.role === 'player');
  const [fraud] = players.filter((player) => player.fraud === true);

  return (
    <div className='finalModal'>
      <div className='finalContainer'>
        <div className='final_result_text'>
          The Fraud was <strong>{fraud?.username || 'not found'}</strong>!
        </div>
        Score:
        <div className='final_result'>
          {players.map((player) => (
            <>{`${player.username}: ${player.score}`}</>
          ))}
        </div>
        <button onClick={() => setOpenFinal(false)}>X</button>
      </div>
    </div>
  );
};

export default FinalResultsModal;
