import './App.css';
// import PlayerList from './Components/playerList.jsx';
// import GameLogic from './Components/GameLogic.jsx';
// import Players from './Components/Players.jsx';
// import Chat from './Components/Chat.jsx';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import GameLogic from './Components/GameLogic.jsx';
import Players from './Components/Players.jsx';
import Chat from './Components/Chat.jsx';

function App() {
  return (
    <div className='App'>
      <header className='App-header'></header>
      {/* <PlayerList/>
      <Players /> */}
      <GameLogic />
      <GameMain />
      {/* <div>canvas goes here</div> */}
      <Chat />
    </div>
  );
}

export default App;
