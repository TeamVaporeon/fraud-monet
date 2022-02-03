import React, { useState, createContext, useEffect, useContext } from 'react';
import { AppContext } from '../../../App.jsx';
import './FinalResultsModal.css';

const FinalResultsModal = ({ setOpenFinal }) => {
  const { setRound, players, setStart } = useContext(AppContext);
  return (
    <div className='finalModal'>
      <div className='finalContainer'>
        <h3 className='finalTitle'>Final Results:</h3>
        {/* <div></div> */}
        <div className='finalScore'>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>Role</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => {
                return (
                  <tr>
                    <td>{player.username}</td>
                    <td>{player.role}</td>
                    <td>{player.score}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          className='finalCloseBtn'
          onClick={() => {
            setOpenFinal(false);
            setRound(0);
            setStart(false);
            sessionStorage.setItem('gameStarted', 'false');
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default FinalResultsModal;
