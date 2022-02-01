/*eslint no-unused-vars: 0*/

import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import makeRoomData from './mock-data.js';
import { useState, createContext } from 'react';

export const AppContext = createContext();

function App() {
  const dummyData = makeRoomData();

  console.log(dummyData);
  const [playerUsername, setPlayerUsername] = useState('');
  const [round, setRound] = useState(0);

  return (
    <AppContext.Provider
      value={{ dummyData, playerUsername, setPlayerUsername, round, setRound }}
    >
      <div className='App'>
        <header className='App-header'></header>
        <GameMain />
      </div>
      {console.log('test invited player input username:::', playerUsername)}
    </AppContext.Provider>
  );
}

export default App;
