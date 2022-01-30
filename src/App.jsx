import './App.css';
import GameLogic from './Components/GameLogic.jsx';
import Players from './Components/Players.jsx';
import Chat from './Components/Chat.jsx';
import makeRoomData from './mock-data';
import { createContext } from 'react';

export const AppContext = createContext();

function App() {
  const dummyData = makeRoomData();

  console.log(dummyData);

  return (
    <AppContext.Provider value={{ dummyData }}>
      <div className='App'>
        <header className='App-header'></header>
        <Players />
        <GameLogic />
        <div>canvas goes here</div>
        <Chat />
      </div>
    </AppContext.Provider>
  );
}

export default App;
