import React, { useState, useContext } from 'react';
import './ResultsModal.css';
import { AppContext } from '../../../App';

const ResultsModal = ({ setOpenResults, setOpenVote, setOpenFinal }) => {
  const {
    socket,
    players,
    guess,
    currentUser,
    QM,
    setMostVoted,
    mostVoted,
    users,
    setWinner,
  } = useContext(AppContext);
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
        socket.emit('score', { winner: 'fraud', users: users });
        socket.emit('judged', 'Y');
      }
      setMostVoted(most);
      revealFraud(true);
    }
    setVoteCount(data);
  });

  const judgement = (e) => {
    if (e.target.value === 'Y') {
      socket.emit('score', { winner: 'fraud', users: users });
    } else {
      socket.emit('score', { winner: 'player', users: users });
    }
    socket.emit('judged', e.target.value);
  };

  socket.on('judged', (data) => {
    setWinner(data);
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
          {fraud && players.length > 0 ? (
            <div style={{ color: 'crimson' }}>
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
            <div>Did the Fraud guess correctly?</div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <button value='Y' className='resultsBtn' onClick={judgement}>
                YES
              </button>
              <button value='N' className='resultsBtn' onClick={judgement}>
                NO
              </button>
            </div>
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
