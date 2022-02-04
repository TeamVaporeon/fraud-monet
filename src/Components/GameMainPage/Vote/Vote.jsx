import React, { useState, useContext } from 'react';
import './Vote.css';
import { AppContext } from '../../../App';

const Vote = ({ setOpenVote, setOpenResults }) => {
  const { socket, players, currentUser, guess, setGuess } =
    useContext(AppContext);
  const [pick, setPick] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.length > 0 || !currentUser.fraud) {
      if (pick !== '') {
        socket.emit('vote', pick);
        setOpenResults(true);
        setOpenVote(false);
      }
      if (currentUser.fraud) {
        socket.emit('guess', guess);
      }
    }
  };

  return (
    <div className='voteModal'>
      <div className='voteContainer'>
        <h3 className='voteTitle'>Vote</h3>
        {currentUser.fraud
          ? `You're the fraud! Submit your best guess for the Prompt, and vote for someone else to take the blame!`
          : `Who's the fraud? Select the player you think is the fake below.`}
        <form className='voteForm'>
          <label className='votePlayername'>
            {players.map((player) => {
              return (
                <div
                  key={player.id}
                  onClick={() => {
                    setPick(player.username);
                  }}
                >
                  <input
                    type='radio'
                    name='ckb'
                    value={player.username}
                    id={player.id}
                    required
                  />
                  <span style={{ color: player.color }}>{player.username}</span>
                </div>
              );
            })}
          </label>
          {currentUser.fraud ? (
            <input
              placeholder='Guess the Prompt'
              type='text'
              onChange={(e) => setGuess(e.target.value)}
              required={true}
            ></input>
          ) : null}
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
