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
  const [currentUser, setCurrentUser] = useState({});
  const [availColors, setAvailColors] = useState(defaultColors);
  const [gameStarted, setStart] = useState(false);

  if (hostSocket.id) {
    socket = hostSocket;
  }

  socket.on('users', (userList) => {
    setUsers(userList);
  });

  socket.on('newUser', (newUsers) => {
    setUsers(newUsers);
  });

  socket.on('session', ({ sessionID, userID }) => {
    console.log(socket);
    socket.auth.sessionID = sessionID;
    localStorage.setItem('sessionID', sessionID);
    socket.userID = userID;
    socket.auth.userID = userID;
  })

  function checkForSession() {
    const sessionID = localStorage.getItem('sessionID');
    console.log(sessionID && socket.auth);
    if (sessionID) {
      console.log(socket);
      socket.auth.sessionID = sessionID;
      socket.connect();
    }
  }

  const dummyData = makeRoomData();
  useEffect(() => {
    checkForSession();
  }, [])
  socket.on('availColors', (colors) => {
    setAvailColors(colors);
  });

  socket.on('start', (roomInfo) => {
    setAvailColors(roomInfo.colors);
  });

  useEffect(() => {
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
    socket.auth && console.log('user: ', socket.auth.user);
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
      }}
    >
      <div className='App'>
        <header className='App-header'></header>
        <GameMain />
      </div>
    </AppContext.Provider>
  );
}

export default App;
