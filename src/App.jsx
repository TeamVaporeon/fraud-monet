/*eslint no-unused-vars: 0*/

import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import makeRoomData from './mock-data.js';
import { createContext } from 'react';
import CreateRoom from './Components/CreateRoom.jsx'

export const AppContext = createContext();

function App() {
  const dummyData = makeRoomData();

  console.log(dummyData);

  return (
    <AppContext.Provider value={{ dummyData }}>
      <div className='App'>
        <header className='App-header'></header>
        <CreateRoom/>
        {/* <GameMain /> */}
        {/* <Players />
        <div>canvas goes here</div>
        <Chat /> */}
      </div>
    </AppContext.Provider>
  );
}

export default App;
