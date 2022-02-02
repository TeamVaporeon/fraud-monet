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

const GameMain = ({ dummyData, actualData }) => {
  const ref = useRef(null);
  const { round, setRound, socket } = useContext(AppContext);
  const [openUsername, setOpenUsername] = useState(true);
  const [openRules, setOpenRules] = useState(false);
  const [openResults, setOpenResults] = useState(false);
  const [openVote, setOpenVote] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);

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
      {openFinal ? <FinalResultsModal setOpenFinal={setOpenFinal} /> : null}
      {openVote ? (
        <Vote setOpenVote={setOpenVote} setOpenResults={setOpenResults} />
      ) : null}
      {openResults ? (
        <ResultsModal
          setOpenVote={setOpenVote}
          setOpenResults={setOpenResults}
          setOpenFinal={setOpenFinal}
        />
      ) : null}
      <div className='game_topbar'>
        <div>
          <GameLogic />
        </div>
        <div className='game_round'>
          <div>Round: {round}</div>
          <span>buttons for tests, will delete later</span>
          <button onClick={() => setRound(round + 1)}>Round+1</button>
          <button onClick={() => setOpenVote(true)}>Vote:R=3</button>
          <button onClick={() => setOpenFinal(true)}>FinalRes</button>
        </div>
        <div className='game_rules' onClick={() => setOpenRules(true)}>
          Rules
        </div>
      </div>
      <div className='game_body'>
        <div className='game_players'>
          <PlayerList dummyData={dummyData} actualData={actualData} />
        </div>
        <div className='game_canvas' ref={ref}>
          {ref.current?.offsetWidth ? (
            <Canvas
              width={ref.current.offsetWidth}
              height={ref.current.offsetHeight}
            />
          ) : null}
        </div>
        <div className='game_chat'>
          <Chat socket={socket} />
        </div>
      </div>
    </div>
  );
};

export default GameMain;
