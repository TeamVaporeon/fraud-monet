import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';

const GameLogic = () => {
  const data = useContext(AppContext);
  const [currentViewer, setCurrentViewer] = useState(data.dummyData.viewers[0]);

  const [host, setHost] = useState(false); //true when player is host
  const [player, setPlayer] = useState(false); //true when playing false when spectating
  const [color, setColor] = useState(null); //player drawing color

  const [prompt, setPrompt] = useState('Bulbasaur');
  const [category, setCategory] = useState('Pokemon');
  const [gameStart, setGameStart] = useState(false); //true when host starts game
  const [turn, setTurn] = useState(false); //true when it's player's turn

  useEffect(() => {
    setHost(currentViewer.host);
    setPlayer(currentViewer.role === 'player' ? true : false);
    setColor(currentViewer.color);
    console.log(currentViewer.color);
  }, [currentViewer]);

  const changeView = (e) => {
    setCurrentViewer(data.dummyData.viewers[e.target.value]);
  };

  return (
    <>
      <header style={{ fontWeight: 'bolder', color: color }}>{`CURRENT VIEW: ${
        host ? 'Host' : currentViewer.role
      }`}</header>
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
        currentViewer.fraud ? (
          <span>You are the Fraud!</span>
        ) : (
          <span>{`Prompt: ${prompt}`}</span>
        )
      ) : null}
    </>
  );
};

export default GameLogic;
