/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from 'react';
import './GameMain.css';
import PlayerList from '../../PlayerList/PlayerList.jsx';
import Chat from '../../Chat/Chat.jsx';
import GameLogic from '../../GameLogic';
import UsernameModal from '../UsernameModal/UsernameModal';
import Rules from '../Rules/Rules';
import FinalResultsModal from '../FinalResultsModal/FinalResultsModal';
import ResultsModal from '../ResultsModal/ResultsModal';
import Canvas from '../Canvas/Canvas.jsx';
import Vote from '../Vote/Vote';
import { AppContext } from '../../../App';
import { hostSocket } from '../../CreateRoom';

const GameMain = () => {
  console.log('something changed');
  const ref = useRef(null);
  const { round, setRound, socket, users, currentUser } =
    useContext(AppContext);

  const [openUsername, setOpenUsername] = useState(() => {
    if (hostSocket.id) {
      return false;
    } else {
      return true;
    }
  });
  const [openRules, setOpenRules] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [openVote, setOpenVote] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);

  socket.auth = {
    user: {
      username: 'Anonymous',
      roomID: window.location.pathname,
      color: '#000',
      host: false,
      fraud: false,
      role: 'spectator',
      score: 0,
    },
  };
  socket.connect();

  socket.on('noRoom', () => {
    // Render a room doesn't exist error page
  });

  socket.on('sessionExist', (user) => {
    socket.emit('joinRoom', user.roomID);
    setOpenUsername(false);
  });

  useEffect(() => {
    if (round === 3) {
      setOpenVote(true);
    }
  }, [round]);

  return (
    <div className='game'>
      <h1 className='game_logo'>Fraud Monet </h1>
      {openRules ? <Rules setOpenRules={setOpenRules} /> : null}
      {openUsername ? (
        <UsernameModal setOpenUsername={setOpenUsername} socket={socket} />
      ) : null}
      <div className='game_topbar'>
        <div>
          <GameLogic />
        </div>
        <div className='game_round'>
          <div>Round: {round}</div>
          {/* <span>buttons for tests, will delete later</span> */}
          <button onClick={() => setRound(round + 1)}>
            Modal Test Round+1
          </button>
        </div>
        <div className='game_rules' onClick={() => setOpenRules(true)}>
          Rules
        </div>
      </div>
      <div className='game_body'>
        {openVote ? (
          <Vote setOpenVote={setOpenVote} setOpenResults={setOpenResults} />
        ) : null}
        {openFinal ? <FinalResultsModal setOpenFinal={setOpenFinal} /> : null}

        {openResults ? (
          <ResultsModal
            setOpenVote={setOpenVote}
            setOpenResults={setOpenResults}
            setOpenFinal={setOpenFinal}
          />
        ) : null}
        <div className='game_players'>
          <PlayerList />
        </div>
        <div className='game_canvas' ref={ref}>
          {ref.current ? <Canvas thingy={ref.current} /> : null}
        </div>
        <div className='game_chat'>
          <Chat socket={socket} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default GameMain;
