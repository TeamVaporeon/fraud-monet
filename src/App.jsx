import './App.css';
import GameMain from './Components/GameMainPage/GameMain/GameMain.jsx';
import makeRoomData from './mock-data.js';
import { useState, createContext, useEffect } from 'react';
import io from 'socket.io-client';
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
    console.log(sessionID);
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
  }, [socket.auth]);

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
        <GameMain />
      </div>
      {/* {console.log(dummyData)}
      {console.log(users)} */}
    </AppContext.Provider>
  );
}

export default App;
