const { InMemorySessionStore } = require('../sessionStore');
const sessionStore = new InMemorySessionStore();

module.exports = {
  saveUser: function(socket, callback) {
    console.log(socket);
  },
  initializeUser: function(socket, url, callback) {
    socket.room = url;
    socket.join(socket.room);
    socket.user ? socket.user.id = socket.id : socket.user = {};
    console.log(`Socket Connected With Id: `, socket.id);
  },
  ifUserInSession: function(user) {
    let session = sessionStore.findSession(user.id);
    if (session) {
      return session;
    }
  },
  sessionStore: sessionStore,
}
