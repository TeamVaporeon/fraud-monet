/*eslint-disable no-unused-vars*/

import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import makeRoomData from './mock-data.js';
import { createContext } from 'react';
import io from 'socket.io-client';

export const AppContext = createContext();


function App() {
  console.log('PATH', window.location.pathname);
  const socket = io();
  socket.emit('room', window.location.pathname);
  const dummyData = makeRoomData();

  console.log(dummyData);

  return (
    <AppContext.Provider value={{ dummyData }}>
      <div className='App'>
        <header className='App-header'></header>
        <GameMain socket={socket} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
