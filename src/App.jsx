import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import makeRoomData from './mock-data.js';
import { useState, createContext, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { hostSocket } from './Components/CreateRoom';

export const AppContext = createContext();

const colors = [
  '#FFCCEB', // 'Cotton Candy',
  '#DF6770', // 'Candy Pink',
  '#EA9F4E', // 'Sandy Brown',
  '#FBE89B', // 'Green Yellow Crayola',
  '#B9E49F', // 'Granny Smith Apple',
  '#73E5DA', // 'Turquoise',
  '#94B1E9', // 'Wild Blue Yonder',
  '#AE97CD', // 'Wisteria',
  '#D9ABD6', // 'Lilac',
  '#A9B3BF', // 'Cadet Blue Crayola',
];

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
  const [availColors, setAvailColors] = useState(colors);

  if (hostSocket.id) {
    socket = hostSocket;
  }

  socket.on('users', (userList) => {
    console.log('updated users');
    setUsers(userList);
  });

  socket.on('newUser', (newUsers) => {
    setUsers(newUsers);
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
      }}
    >
      <div className='App'>
        <header className='App-header'></header>
        <GameMain />
      </div>
      {console.log(users)}
    </AppContext.Provider>
  );
}

export default App;
