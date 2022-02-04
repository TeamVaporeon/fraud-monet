const { InMemorySessionStore } = require('../sessionStore');
const sessionStore = new InMemorySessionStore();

module.exports = {
  saveUser: function(socket) {
    console.log(socket);
  },
  sessionStore: sessionStore,
}