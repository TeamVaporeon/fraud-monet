const { InMemorySessionStore } = require('../sessionStore');
const sessionStore = new InMemorySessionStore();

// Set or get user data for the socket
// socket comes with a session id from the client
// if session id is null it's the client's first time connecting
// (sessionID will be created in this case in middleware)
  const initializeUser = function(socket) {
    let sessionId = socket.handshake.auth.sessionID;
    let user = socket.handshake.auth.user;

    user.id = socket.id;

    if (sessionId) {

      let userSession = checkForSession(sessionId)

      if (userSession) {
        // Assign user to socket everywhere it needs to be
        socket.user = userSession;
        socket.handshake.auth.user = userSession;
        socket.room = userSession.roomID

        // Set sessionId everywhere it needs to be
        socket.user.sessionID = sessionId;
        socket.sessionID = sessionId;
        socket.handshake.auth.sessionID = sessionId;

        return socket;
      } else {
        // Assign user to socket everywhere it needs to be
        socket.user = user;
        socket.handshake.auth.user = user;
        socket.room = user.roomID;

        // Set sessionId everywhere it needs to be
        socket.user.sessionID = sessionId;
        socket.sessionID = sessionId;
        socket.handshake.auth.sessionID = sessionId;

        saveUser(sessionId, user);
        return socket;
      }
    }
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
