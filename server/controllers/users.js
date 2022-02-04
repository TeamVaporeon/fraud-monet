const argon2 = require('argon2');
const { InMemorySessionStore } = require('../sessionStore');
const sessionStore = new InMemorySessionStore();

// Set or get user data for the socket
// socket comes with a session id from the client
// if session id is null it's the client's first time connecting
// (sessionID will be created in this case in middleware)
  const initializeUser = function(socket, user, sessionID, roomID) {
    user = user || socket.handshake.auth.user;
    sessionID = sessionID || socket.handshake.auth.sessionID;
    roomID = roomID || socket.handshake.auth.user.roomID;

    user.id = socket.id;

    if (sessionID) {
      return setSession(socket, sessionID, roomID, user);
    } else {
      getHash(user.username).then((hash) => {
        return setSession(socket, hash, roomID, user);
      })
    }
    return socket;
  }

  const setSession = function(socket, sessionID, roomID, user) {
    let userSession = checkForSession(sessionID)

    if (userSession) {
      setUser(socket, userSession);
    } else {
      setUser(socket, user);
      // Save user since this is the first session
      saveUser(sessionID, user);
    }
    setSessionID(socket, sessionID);
    setRoomID(socket, roomID);
    return socket;
  }

  const setUser = function(socket, user) {
    // Assign user to socket everywhere it needs to be
    socket.user = user;
    socket.handshake.auth.user = user;
    return socket;
  };

  // Set sessionId everywhere it needs to be
  const setSessionID = function(socket, sessionID) {
  socket.user.sessionID = sessionID;
  socket.sessionID = sessionID;
  socket.handshake.auth.sessionID = sessionID;
  return socket;
  }

  const setRoomID = function(socket, roomID) {
    socket.user.roomID = roomID;
    socket.roomID = roomID;
    socket.handshake.auth.roomID = roomID;
    return socket;
  }

  // Save user as new session
  const saveUser = function(sessionId, user) {
    // If sessionId exists then use that as key
    if (sessionId && user) {
      sessionStore.saveSession(sessionId, user);
    // otherwise use the user's sessionId as key
    } else if (user) {
      sessionStore.saveSession(user.sessiondId, user);
    }
  }

  const getHash = async function(str) {
    return await argon2.hash(str)
  }

  // Checks for existing session in storage
  const checkForSession = function(sessionId) {
    let user = sessionStore.findSession(sessionId);
    if (user) {
      return user;
    } else {
      return null;
    }
  }

module.exports = {
  sessionStore: sessionStore,
  saveUser: saveUser,
  checkForSession: checkForSession,
  initializeUser: initializeUser,
}
