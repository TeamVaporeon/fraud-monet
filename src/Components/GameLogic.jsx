import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

const GameLogic = () => {
  const data = useContext(AppContext);

  const [gameStart, setGameStart] = useState(false); //true when host starts game
  const [host, setHost] = useState(false); //true when player is host
  const [player, setPlayer] = useState(false); //false when they are the fraud
  const [turn, setTurn] = useState(false); //true when it's player's turn
  const [color, setColor] = useState(null); //player drawing color
  const [category, setCategory] = useState('Pokemon');
  const [prompt, setPrompt] = useState('Bulbasaur');

  useEffect();

  return (
    <>
      <select></select>
      <div>{`Category: ${category}`}</div>
      {player ? (
        <div>{`Prompt: ${prompt}`}</div>
      ) : (
        <div>You are the Fraud!</div>
      )}
    </>
  );
};

export default GameLogic;
