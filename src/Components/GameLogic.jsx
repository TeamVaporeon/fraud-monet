import { useContext, useState } from 'react';
import { AppContext } from '../App';

const GameLogic = () => {
  const { currentUser, socket, round, players, gameStarted } =
    useContext(AppContext);

  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');

  socket.on('start', (data) => {
    setPrompt(data.prompt);
    setCategory(data.category);
  });

  return (
    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
      <div>{`Category: ${category}`}</div>
      {currentUser &&
      (currentUser.role === 'player' || currentUser.role === 'qm') ? (
        currentUser.fraud ? (
          <div style={{ color: 'crimson' }}>You are the Fraud!</div>
        ) : (
          <div>{`Prompt: ${prompt}`}</div>
        )
      ) : null}
      {currentUser.role === 'qm' && gameStarted ? (
        <div>{`The Fraud is ${
          players.filter((player) => player.fraud)[0]
        }`}</div>
      ) : null}
    </div>
  );
};

export default GameLogic;
