import React, { useContext } from 'react';
import { AppContext } from '../../../App.jsx';
import './FinalResultsModal.css';

const FinalResultsModal = ({ setOpenFinal }) => {
  const { setRound, players, setStart, QM, winner, socket } =
    useContext(AppContext);
  return (
    <div className='finalModal'>
      <div className='finalContainer'>
        <h3 className='finalTitle'>Final Results:</h3>
        <div className='finalDesc'>
          {winner === 'fraud' ? 'The Fraud Wins!' : 'The Artists Win!'}
        </div>
        <div className='finalScore'>
          <table className='score_tb'>
            <thead>
              <tr>
                <th className='l'>Player</th>
                <th className='m'>Role</th>
                <th className='r'>Score</th>
              </tr>
            </thead>
            <tbody>
              {players.length > 0
                ? players.map((player) => {
                    return (
                      <tr>
                        <td className='l'>{player.username}</td>
                        <td className='m'>
                          {player.fraud ? 'FRAUD' : 'Player'}
                        </td>
                        <td className='r'>{player.score}</td>
                      </tr>
                    );
                  })
                : null}
              {QM.id ? (
                <tr>
                  <td className='l'>{QM.username}</td>
                  <td className='m'>Question Master</td>
                  <td className='r'>{QM.score}</td>
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
