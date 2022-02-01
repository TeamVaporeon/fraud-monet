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
<<<<<<< HEAD
        <GameMain />
=======
        <CreateRoom/>
        {/* <GameMain /> */}
        {/* <Players />
        <div>canvas goes here</div>
        <Chat /> */}
>>>>>>> 8f09df6cb2e4061b8eee498d4e64a38216d8ff76
      </div>
    </AppContext.Provider>
  );
}

export default App;
