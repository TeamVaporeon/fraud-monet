/*eslint-disable no-unused-vars*/

import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import makeRoomData from './mock-data.js';
import { useState, createContext } from 'react';
import CreateRoom from './Components/CreateRoom.jsx';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

export const AppContext = createContext();


function App() {

  const socket = io();
  socket.emit('room', window.location.pathname);
  const dummyData = makeRoomData();

  console.log(dummyData);
  const [playerUsername, setPlayerUsername] = useState('');

  // Initial 0; after clicked Start, 1; after first vote, 2; after second vote, 3 >> Game End, Show result modal
  const [round, setRound] = useState(0);

  return (
    <AppContext.Provider
      value={{ dummyData, playerUsername, setPlayerUsername, round, setRound, socket }}
    >
      <div className='App'>
        <header className='App-header'></header>
        <GameMain data={dummyData} />
      </div>
      {console.log('test invited player input username:::', playerUsername)}
    </AppContext.Provider>
  );
}

export default App;
