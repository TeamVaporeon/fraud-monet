/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './GameMain.css';
import PlayerList from '../../PlayerList/PlayerList.jsx';
import Chat from '../../Chat/Chat.jsx';
import GameLogic from '../../GameLogic';
import UsernameModal from '../UsernameModal/UsernameModal';
import Rules from '../Rules/Rules';
import FinalResultsModal from '../FinalResultsModal/FinalResultsModal';
import ResultsModal from '../ResultsModal/ResultsModal';
import PromptModal from '../PromptModal/PromptModal.jsx';
import Canvas from '../Canvas/Canvas.jsx';
import Vote from '../Vote/Vote';
import axios from 'axios';
import { AppContext } from '../../../App';
import { hostSocket } from '../../CreateRoom';

const GameMain = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
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
  const [openPrompt, setOpenPrompt] = useState(false);


  useEffect(() => {
    if (round === 2) {
      if (currentUser.role === 'qm') {
        setOpenResults(true);
      } else {
        setOpenVote(true);
      }
    }
  }, [round, currentUser.role]);

  useEffect(() => {
    // If room exists, continue, else server will redirect
    axios.get(`/room${window.location.pathname}`)
      .catch(err => {
        navigate('/');
      });
    socket.on('start', () => {
      setOpenFinal(false);
      setOpenResults(false);
      setOpenRules(false);
      setOpenUsername(false);
      setOpenVote(false);
    })
  }, []);

  return (
    <div className='game'>
      <h1 className='game_logo'>Fraud Monet </h1>
      {openRules ? <Rules setOpenRules={setOpenRules} /> : null}
      {openUsername ? (
        <UsernameModal setOpenUsername={setOpenUsername} socket={socket} />
      ) : null}
      {openPrompt ? <PromptModal setOpenPrompt={setOpenPrompt}/> : null}
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
          <PlayerList setOpenPrompt={setOpenPrompt}/>
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
