import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import { useState, createContext, useEffect } from 'react';
import io from 'socket.io-client';
import { hostSocket } from './Components/CreateRoom';

export const AppContext = createContext();

const defaultColors = {
  '#FFCCEB': true, //Cotton Candy
  '#DF6770': true, //Candy Pink
  '#ff69b4': true, //Hot Pink
  '#EA9F4E': true, //Sandy Brown
  '#a52a2a': true, //Brown
  '#ff0000': true, //Red
  '#ffa500': true, //Orange
  '#FBE89B': true, //Green Yellow Crayola
  '#ffff00': true, //Yellow
  '#00ff00': true, //Lime
  '#B9E49F': true, //Granny Smith Apple
  '#008000': true, //Green
  '#73E5DA': true, //Turquoise
  '#94B1E9': true, //Wild Blue Yonder
  '#0000ff': true, //Blue
  '#4b0082': true, //Indigo
  '#800080': true, //Purple
  '#AE97CD': true, //Wisteria
  '#D9ABD6': true, //Lilac
  '#A9B3BF': true, //Cadet Blue Crayola
};

var socket = io({
  withCredentials: true,
  autoConnect: false,
});

function App() {
  const [round, setRound] = useState(0);
  const [users, setUsers] = useState(
    hostSocket.id ? [hostSocket.auth.user] : []
  );
  const [players, setPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [availColors, setAvailColors] = useState(defaultColors);
  const [gameStarted, setStart] = useState(false);
  const [turn, setTurn] = useState(0);
  const [QM, setQM] = useState({});

  if (hostSocket.id) {
    socket = hostSocket;
  }

  window.onbeforeunload = () => {
    sessionStorage.clear();
  };

  socket.on('users', (userList) => {
    setUsers(userList);
    setQM(userList.filter((player) => player.role === 'qm')[0] || {});
    setPlayers(userList.filter((player) => player.role === 'player'));
    sessionStorage.setItem('users', JSON.stringify(users));
  });

  socket.on('round', () => {setRound(round + 1); console.log('received emission')});

  socket.on('newUser', (newUsers) => {
    setUsers(newUsers);
  });

  socket.on('gameStart', (response) => {
    setStart(true);
    sessionStorage.setItem('gameStarted', 'true');
    console.log('gamestart received');
  });

  socket.on('availColors', (colors) => {
    setAvailColors(colors);
  });

  socket.on('start', (roomInfo) => {
    setAvailColors(roomInfo.colors);
  });

  // socket.on('game_start', (players) => {
  //   console.log(players.filter((player) => player.id === currentUser.id)[0]);
  //   setCurrentUser(players.filter((player) => player.id === currentUser.id)[0]);
  //   console.log('after start: ', socket.auth.user);
  //   console.log(
  //     'from server: ',
  //     players.filter((player) => player.id === currentUser.id)[0]
  //   );
  // });

  useEffect(() => {
    if (currentUser.id) {
      setCurrentUser(users.filter((player) => player.id === currentUser.id)[0]);
    } else if (socket.auth && socket.auth.user) {
      setCurrentUser(socket.auth.user);
    } else {
      setCurrentUser(
        socket.auth && socket.auth.user
          ? socket.auth.user
          : {
              username: null,
              roomID: null,
              color: '#000',
              host: false,
              fraud: false,
              role: 'spectator',
              score: 0,
              id: null,
            }
      );
    }
  }, [users]);

  return (
    <AppContext.Provider
      value={{
        round,
        setRound,
        socket,
        users,
        setUsers,
        currentUser,
        availColors,
        setStart,
        gameStarted,
        turn,
        setTurn,
        QM,
        players,
      }}
    >
      <div className='App'>
        <header className='App-header'></header>
        <GameMain />
      </div>
      {/* {console.log(users)} */}
    </AppContext.Provider>
  );
}

export default App;
