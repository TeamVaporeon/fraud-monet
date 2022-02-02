import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import makeRoomData from './mock-data.js';
import { useState, createContext, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { hostSocket } from './Components/CreateRoom';

export const AppContext = createContext();

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
          }
    );
    // setCurrentUser
    console.log(socket.auth);
  }, [socket.auth]);

  if (hostSocket.id) {
    socket = hostSocket;
  }

  socket.on('users', (userList) => {
    setUsers(userList);
  });

  socket.on('newUser', (newUsers) => {
    setUsers(newUsers);
  });
  const dummyData = makeRoomData();

  // Initial 0; after clicked Start, 1; after first vote, 2; after second vote, 3 >> Game End, Show result modal

  useEffect(() => {
    axios
      .get(`/host${window.location.pathname}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <AppContext.Provider
      value={{
        dummyData,
        round,
        setRound,
        socket,
        users,
        setUsers,
        currentUser,
      }}
    >
      <div className='App'>
        <header className='App-header'></header>
        <GameMain dummyData={dummyData} actualData={users} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
