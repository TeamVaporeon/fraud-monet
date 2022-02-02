import { useContext, useState } from 'react';
import { AppContext } from '../App';

const GameLogic = () => {
  const { currentUser } = useContext(AppContext);

  const [prompt, setPrompt] = useState('Bulbasaur');
  const [category, setCategory] = useState('Pokemon');
  const [gameStart, setGameStart] = useState(false); //true when host starts game
  const [turn, setTurn] = useState(false); //true when it's player's turn

  return (
    <>
      <header
        style={{ fontWeight: 'bolder', color: currentUser.color }}
      >{`CURRENT VIEW: ${
        currentUser.host ? 'Host' : currentUser.role
      }`}</header>
      <div>{`Category: ${category}`}</div>
      {currentUser.role === 'player' ? (
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
