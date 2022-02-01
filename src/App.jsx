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
  const [round, setRound] = useState(0);
  const [users, setUsers] = useState([]);

  console.log('PATH', window.location.pathname);

  const socket = io();
  socket.emit('room', window.location.pathname);
  socket.on('session', (userInfo) => {
    console.log('USERINFO', userInfo);
    /** Utilize userInfo to extract the data you need
    and set state accordingly */

    // socket.auth = userInfo.sessionID,
    // // Required
    // localStorage.setItem('sessionID', userInfo.sessionId);
    // // May be unnecessary
    // localStorage.setItem('userID', userInfo.userID);
    // localStorage.setItem('username', userInfo.username);
    // localStorage.setItem('color', userInfo.color);
    // localStorage.setItem('host', userInfo.host);
    // localStorage.setItem('fraud', userInfo.fraud);
    // localStorage.setItem('role', userInfo.role);
  })
  const dummyData = makeRoomData();
  const [playerUsername, setPlayerUsername] = useState('');

  // Initial 0; after clicked Start, 1; after first vote, 2; after second vote, 3 >> Game End, Show result modal

  return (
    <AppContext.Provider
      value={{ dummyData, playerUsername, setPlayerUsername, round, setRound, socket, users, setUsers }}
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
