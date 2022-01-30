/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './GameMain.css';
import Rules from '../Rules/Rules.jsx';
import PlayerList from '../../playerList.jsx';
import Chat from '../../Chat/Chat.jsx';
import GameLogic from '../../GameLogic';

const GameMain = () => {
  // const [d, setD] = useState(null);
  return (
    <div className='game'>
      <h1 className='game_logo'>Fraud Monet</h1>
      <div className='game_topbar'>
        <div>
          <GameLogic />
        </div>
        {/* <div>Prompt: Dolphin / Fraud</div> */}
        <div>Rules</div>
      </div>
      <div className='game_body'>
        <div className='game_players'>
          <PlayerList/>
        </div>
        <div className='game_canvas'>Canvas</div>
        <Chat />
      </div>
    </div>
  );
};

export default GameMain;
