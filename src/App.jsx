import './App.css';
// import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import GameLogic from './Components/GameLogic.jsx';
import Players from './Components/Players.jsx';
import Chat from './Components/Chat.jsx';

function App() {
  return (
    <div className='App'>
      <header className='App-header'></header>
      {/* <GameMain /> */}
      <Players />
      <GameLogic />
      <div>canvas goes here</div>
      <Chat />
    </div>
  );
}

export default App;
