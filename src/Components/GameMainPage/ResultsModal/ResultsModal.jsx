import React, { useState, useContext } from 'react';
import './ResultsModal.css';
import { AppContext } from '../../../App';

const ResultsModal = ({ setOpenResults, setOpenVote, setOpenFinal }) => {
  const { socket, players, guess, currentUser, QM, setMostVoted, mostVoted } =
    useContext(AppContext);
  const [voteCount, setVoteCount] = useState({});
  const [fraud, revealFraud] = useState(false);
  const [judged, setJudged] = useState(false);

  socket.on('get_votes', (data) => {
    if (Object.values(data).reduce((x, y) => x + y) === players.length) {
      const arr = Object.values(data);
      const voteMax = Math.max(...arr);
      let most = Object.entries(data).filter((player) => player[1] === voteMax);
      if (
        most.length > 1 ||
        most[0][0] !== players.filter((player) => player.fraud)[0].username
      ) {
        setJudged(true);
      }
      setMostVoted(most);
      revealFraud(true);
    }
    setVoteCount(data);
  });

  const judgement = (e) => {
    if (e.target.value === 'Y') {
      //Emit point scoring here, 2 pts for Fraud and QM
    } else {
      //Emit 1 pt for everyone except the Fraud and QM
    }
    socket.emit('judged');
  };

  socket.on('judged', () => {
    setJudged(true);
  });

  return (
    <div className='resultsModal'>
      <div className='resultsContainer'>
        <h3 className='resultsTitle'> Vote Results</h3>
        <div className='resultsText'>
          <div>
            <span>{!fraud ? `Current Votes: ` : `Final Count`}</span>
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
          <div>
            Most Voted: {console.log('most voted: ', mostVoted)}
            {mostVoted.map((player) => {
              return <div>{player[0]}</div>;
            })}
          </div>
        ) : null}
        {fraud ? <div>{`Fraud's Guess: ${guess}`}</div> : null}
        {fraud &&
        (currentUser.role === 'qm' || (!QM.id && currentUser.host)) &&
        mostVoted.length === 1 &&
        mostVoted[0][0] ===
          players.filter((player) => player.fraud)[0].username &&
        !judged ? (
          <div>
            <span>Did the Fraud guess correctly?</span>
            <button
              value='Y'
              variant='success'
              className='judgeBtn'
              onClick={judgement}
            >
              YES
            </button>
            <button
              value='N'
              variant='success'
              className='judgeBtn'
              onClick={judgement}
            >
              NO
            </button>
          </div>
        ) : null}
        {fraud && judged ? (
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
