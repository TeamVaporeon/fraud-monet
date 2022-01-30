import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

const GameLogic = () => {
  const data = useContext(AppContext);
  const [currentViewer, setCurrentViewer] = useState(data.dummyData.viewers[0]);

  const [host, setHost] = useState(false); //true when player is host
  const [player, setPlayer] = useState(false); //false when they are the fraud
  const [color, setColor] = useState(null); //player drawing color

  const [prompt, setPrompt] = useState('Bulbasaur');
  const [category, setCategory] = useState('Pokemon');
  const [gameStart, setGameStart] = useState(false); //true when host starts game
  const [turn, setTurn] = useState(false); //true when it's player's turn

  useEffect(() => {
    setHost(currentViewer.host);
    setPlayer(currentViewer.role === 'player' ? true : false);
    setColor(currentViewer.color);
  }, [currentViewer]);

  const changeView = (e) => {
    setCurrentViewer(data.dummyData.viewers[e.target.value]);
  };

  return (
    <>
      <header>{`CURRENT VIEW: ${
        currentViewer.host ? 'Host' : currentViewer.role
      } COLOR: ${currentViewer.color}`}</header>
      <select onChange={(e) => changeView(e)}>
        {data.dummyData.viewers.map((viewer) => {
          return (
            <option
              value={viewer.id}
            >{`${viewer.username} (${viewer.role})`}</option>
          );
        })}
      </select>
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
