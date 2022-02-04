const { InMemorySessionStore } = require('../sessionStore');
const sessionStore = new InMemorySessionStore();

module.exports = {
  sessionStore: sessionStore,
  initializeUser: function(socket, url, room, callback) {
    let sessionId = socket.handshake.auth.sessionId;
    // get user info from socket.hand.auth.user
    let user = socket.handshake.auth.user;
    if (sessionId) {
      // Get user info from session store
      this.checkForSession(sessionId, (e, userInfo) => {
        if (e) callback(e, null);
        // get room id from session store
        if (userInfo) {
          // attach socket to that room
          socket.room = userInfo.room;
          callback(null, socket);
        } else {
          this.saveUser(sessionId, user, (e, sessionid, user) => {
            if (e) callback(e, null);
            socket.handshake.auth.sessionId = sessionid;
            socket.handshake.auth.user = user;
            callback(null, socket);
          })
        }
      })
    } else {
      this.saveUser(null, user, (e, sessionid, user) => {
        if (e) callback(e, null);
        socket.handshake.auth.sessionId = sessionid;
        socket.handshake.auth.user = user;
        callback(null, socket);
      })
    }

  },
  checkForSession: function(sessionId, callback) {
    let user = sessionStore.findSession(sessionId);
    try {
      if (user) {
        callback(null, user);
      } else {
        callback(null, null);
      }
    } catch (err) {
      callback(err, null)
    }
  },
  saveUser: function(sessionId, user, callback) {
    if (sessionId && user) {
      // store user info in sessionStore using socket.auth.sessionId
      sessionStore.saveSession(sessionId, user);
      callback(null, sessionId, user);
    } else if (user) {
      sessionStore.saveSession(user.sessiondId, user);
      callback(null, user.sessionId, user);
    } else {
      callback(new Error('Counl\'t save session'), null);
    }
  },
}
