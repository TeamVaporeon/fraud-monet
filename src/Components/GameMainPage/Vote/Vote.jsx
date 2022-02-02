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
  const [pick, setPick] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /*---send pick to somewhere to count score---*/
    console.log('from submit:', pick);
    setOpenResults(true);
    setOpenVote(false);
  };

  return (
    <div className='voteModal'>
      <div className='voteContainer'>
        <h3>Vote</h3>
        <form className='voteForm'>
          {players.map((player, i) => (
            <label>
              {player}
              <input
                className='ckb'
                type='radio'
                name='ckb'
                value={player}
                id={player}
                onClick={() => {
                  setPick(player);
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Vote;
