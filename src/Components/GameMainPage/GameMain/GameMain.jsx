/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './GameMain.css';
import PlayerList from '../../playerList.jsx';
import Chat from '../../Chat';
import GameLogic from '../../GameLogic';
import UsernameModal from '../UsernameModal/UsernameModal';
import Rules from '../Rules/Rules';
import StartModal from '../StartModal/StartModal';
import ResultsModal from '../ResultsModal/ResultsModal';
import Canvas from '../Canvas/Canvas.jsx';

const GameMain = () => {
  // if host, const [openUsername, setOpenUsername] = useState(false);
  const [openUsername, setOpenUsername] = useState(true);
  const [openRules, setOpenRules] = useState(false);
  const [openStart, setOpenStart] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [playerUsername, setPlayerUsername] = useState(null);

  return (
    <div className='game'>
      <h1 className='game_logo'>Fraud Monet</h1>
      {openRules ? <Rules setOpenRules={setOpenRules} /> : null}
      {openUsername ? (
        <UsernameModal
          setPlayerUsername={setPlayerUsername}
          setOpenUsername={setOpenUsername}
        />
      ) : null}
      <div className='game_topbar'>
        <div>
          <GameLogic />
        </div>
        <div
          className='game_rules'
          onClick={() => {
            setOpenRules(true);
          }}
        >
          Rules
        </div>
      </div>
      <div className='game_body'>
        <div className='game_players'>
          <PlayerList />
        </div>
        <div className='game_canvas'>Canvas
        <Canvas />
        </div>
        <div className='game_chat'>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default GameMain;
