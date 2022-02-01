/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './Vote.css';

const fakePlayers = [
  'palyerA',
  'playerB',
  'playerC',
  'playerD',
  'playerE',
  'playerF',
  'playerG',
  'playerH',
  'playerI',
  'playerJ',
];

const Vote = ({ setOpenVote, setOpenResults }) => {
  const [players, setPlayers] = useState(fakePlayers);

  const chkcontrol = (j) => {
    let total = 0;
    for (let i = 0; i < document.voteForm.ckb.length; i++) {
      if (document.voteForm.ckb[i].checked) {
        total = total + 1;
      }
    }
    if (total > 1) {
      alert('Please Select Only One Player');
      document.voteForm.ckb[j].checked = false;
      return false;
    }
  };

  return (
    <div className='voteModal'>
      <div className='voteContainer'>
        <h3>Vote</h3>
        <form className='voteForm' name='voteForm' method='post'>
          {players.map((player, i) => (
            <label>
              {player}
              <input
                className='ckb'
                type='checkbox'
                name='ckb'
                value={player}
                id={player}
                onClick={() => {
                  chkcontrol(i);
                }}
              />
            </label>
          ))}
        </form>
        <div className='vote_Btns'>
          <button
            className='voteSubmitBtn'
            type='submit'
            value='submit'
            onClick={() => {
              setOpenResults(true);
              setOpenVote(false);
            }}
          >
            Submit
          </button>
          {/* <button onClick={() => setOpenVote(false)}>X</button> */}
        </div>
      </div>
    </div>
  );
};

export default Vote;
