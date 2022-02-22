const { createAdapter } = require('@socket.io/redis-adapter');
const { pubClient, subClient } = require('../adapter.js');
const { roomData, defaultColors } = require('../data.js');

const { log } = require('console');

module.exports = {
  start: function(io) {
    async function saveUser(user, roomID) {
      await pubClient.publish(`${roomID}:users`, JSON.stringify(user));
    };

    async function logUser(roomID) {
      await subClient.subscribe(`${roomID}:users`, (userDetails) => {
        console.log('Saved user', userDetails);

      });
    };

    async function updateUser(user, roomID) {
      // Add logic to update instead of just add another user.
      await pubClient.publish(`${roomID}:users`, JSON.stringify(user));
    };

    io.use((socket, next) => {
      const user = socket.handshake.auth.user;
      user.id = socket.id;
      socket.user = user;
      const roomID = socket.user.roomID
      Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
        saveUser(user, roomID);
        logUser(roomID);
        io.listen(5000);
      });

      socket.emit('user_object', user);
      next();
    });

    io.on('connection', (socket) => {
      log(`Socket connected with ID: ${socket.id}`);

      socket.user.id = socket.id;
      io.of('/').adapter.sockets(new Set()).then(sockets => {
        console.log(sockets);
      });
    });
  }
}