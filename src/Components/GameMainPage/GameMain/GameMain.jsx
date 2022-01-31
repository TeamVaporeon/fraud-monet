/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './GameMain.css';
import PlayerList from '../../playerList.jsx';
import Chat from '../../chat/Chat.jsx';
import GameLogic from '../../GameLogic';
import UsernameModal from '../UsernameModal/UsernameModal';
import Rules from '../Rules/Rules';
import StartModal from '../StartModal/StartModal';
import ResultsModal from '../ResultsModal/ResultsModal';

import io from 'socket.io-client';
const socket = io.connect('http://localhost:8080');

// TEMPORARY: Pending identification of how to receive room & usernames
const room = 'temporary';
const username = 'tempUser';

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
        <div className='game_canvas'>Canvas</div>
        <div className='game_chat'>
          <Chat socket={socket} room={room} username={playerUsername} />
        </div>
      </div>
    </div>
  );
};

export default GameMain;
