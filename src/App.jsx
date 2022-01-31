import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import makeRoomData from './mock-data.js';
import { createContext } from 'react';

export const AppContext = createContext();

function App() {
  const dummyData = makeRoomData();

  console.log(dummyData);

  return (
    <AppContext.Provider value={{ dummyData }}>
      <div className='App'>
        <header className='App-header'></header>
        <GameMain />
      </div>
    </AppContext.Provider>
  );
}

export default App;
