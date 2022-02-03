import React, { useState, useContext } from 'react';
import './Vote.css';
import { AppContext } from '../../../App';

const Vote = ({ setOpenVote, setOpenResults }) => {
  const { socket, players } = useContext(AppContext);
  const [pick, setPick] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /*---send pick to somewhere to count score---*/
    socket.emit('vote', pick);
    setOpenResults(true);
    setOpenVote(false);
  };

  return (
    <div className='voteModal'>
      <div className='voteContainer'>
        <h3 className='voteTitle'>Vote</h3>
        Who's the fraud? Select the player you think is the fake below.
        <form className='voteForm'>
          <label className='votePlayername'>
            {players.map((player) => {
              return (
                <div key={player.id}>
                  <input
                    type='radio'
                    name='ckb'
                    value={player.username}
                    id={player.id}
                    onClick={() => {
                      setPick(player.username);
                    }}
                    required='required'
                  />
                  <span>{player.username}</span>
                </div>
              );
            })}
          </label>
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
