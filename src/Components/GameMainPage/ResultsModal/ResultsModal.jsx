import React, { useState, useContext } from 'react';
import './ResultsModal.css';
import { AppContext } from '../../../App';

const ResultsModal = ({ setOpenResults, setOpenVote, setOpenFinal }) => {
  const { socket, players } = useContext(AppContext);
  const [voteCount, setVoteCount] = useState({});
  const [fraud, revealFraud] = useState(false);

  socket.on('get_votes', (data) => {
    if (Object.values(data).reduce((x, y) => x + y) === players.length) {
      revealFraud(true);
    }
    setVoteCount(data);
  });

  return (
    <div className='resultsModal'>
      <div className='resultsContainer'>
        <h3 className='resultsTitle'> Vote Results</h3>
        <div className='resultsText'>
          <div>
            Current Votes:{' '}
            {Object.entries(voteCount).map((entry) => {
              return (
                <div key={entry[0]}>
                  {entry[0]}: {entry[1]}
                </div>
              );
            })}
          </div>
          {fraud ? (
            <div style={{ color: 'red' }}>
              <span>
                {`Fraud Monet: ${
                  players.filter((player) => player.fraud)[0].username
                }`}
              </span>
            </div>
          ) : null}
        </div>
        {fraud ? (
          <button
            className='resultsBtn'
            onClick={() => {
              setOpenResults(false);
              setOpenFinal(true);
            }}
          >
            Show Final Scores
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default ResultsModal;
