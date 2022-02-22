const { createAdapter } = require('@socket.io/redis-adapter');
const { pubClient, subClient } = require('../adapter.js');
const { roomData } = require('../data.js');

module.exports = {
  start: function(io) {
    io.on('connection', (socket) => {
      // Emit handlers
      socket.on('createRoom', (data, next) => {
        const adapter = io.of('createRoom').adapter;
        adapter.pubClient.publish(data);
        socket.emit('session', {
          sessionID: socket.sessionID,
          userID: socket.userID,
          username: socket.username,
          color: socket.color,
          host: socket.host,
          fraud: socket.fraud,
          role: socket.role,
        });
        socket.emit('packet', data);
      });
    })
  }
}