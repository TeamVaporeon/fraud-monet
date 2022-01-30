/* eslint-disable no-unused-vars */
import React, { useState, createContext, useEffect, useContext } from 'react';
import './GameMain.css';
import Rules from '../Rules/Rules.jsx';

const GameMain = () => {
  // const [d, setD] = useState(null);
  return (
    <div className='game'>
      <h1 className='game_logo'>Fraud Monet</h1>
      <div className='game_topbar'>
        <div>Category: Animals</div>
        <div>Prompt: Dolphin / Fraud</div>
        <div>Rules</div>
      </div>
      <div className='game_body'>
        <div className='game_players'>Players</div>
        <div className='game_canvas'>Canvas</div>
        <div className='game_chat'>Chat</div>
      </div>
    </div>
  );
};

export default GameMain;
