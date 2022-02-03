import { useContext, useEffect, useState } from 'react';
import { useResolvedPath } from 'react-router-dom';
import { AppContext } from '../App';

const GameLogic = () => {
  const { currentUser, socket, gameStarted, users } = useContext(AppContext);

  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('');

  socket.on('start', (data) => {
    setPrompt(data.prompt);
    setCategory(data.category);
  });

  return (
    <>
      {/* <header
        style={{ fontWeight: 'bolder', color: currentUser.color }}
      >{`CURRENT VIEW: ${
        currentUser.host ? 'Host' : currentUser.role
      }`}</header> */}
      <div>{`Category: ${category}`}</div>
      {currentUser && currentUser.role === 'player' ? (
        currentUser.fraud ? (
          <span>You are the Fraud!</span>
        ) : (
          <span>{`Prompt: ${prompt}`}</span>
        )
      ) : null}
    </>
  );
};

export default GameLogic;
