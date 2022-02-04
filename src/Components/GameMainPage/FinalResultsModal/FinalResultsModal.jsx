import React, { useState, createContext, useEffect, useContext } from 'react';
import { AppContext } from '../../../App.jsx';
import './FinalResultsModal.css';

const FinalResultsModal = ({ setOpenFinal }) => {
  const { setRound, players, setStart, QM, winner, socket, setGuess } = useContext(AppContext);
  return (
    <div className='finalModal'>
      <div className='finalContainer'>
        <h3 className='finalTitle'>Final Results:</h3>
        <div>{winner === 'fraud' ? 'The Fraud Wins!' : 'The Artists Win!'}</div>
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
              {players.length > 0
                ? players.map((player) => {
                    return (
                      <tr>
                        <td>{player.username}</td>
                        <td>{player.fraud ? 'FRAUD' : 'Player'}</td>
                        <td>{player.score}</td>
                      </tr>
                    );
                  })
                : null}
              {QM.id ? (
                <tr>
                  <td>{QM.username}</td>
                  <td>Question Master</td>
                  <td>{QM.score}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <button
          className='finalCloseBtn'
          onClick={() => {
            setOpenFinal(false);
            setRound(0);
            setStart(false);
            setGuess('');
            sessionStorage.setItem('gameStarted', 'false');
            socket.emit('new_game');
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default FinalResultsModal;
