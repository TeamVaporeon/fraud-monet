/*eslint-disable no-unused-vars*/

import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import makeRoomData from './mock-data.js';
import { useState, createContext } from 'react';
import io from 'socket.io-client';

export const AppContext = createContext();

function App() {

  const socket = io({
    withCredentials: true,
    autoConnect: false
  });
  socket.on('users', (users) => {
    console.log('FRONT USERS', users);
  });
  socket.on('newUser', (user) => {
    console.log('New User:', user);
  })
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
