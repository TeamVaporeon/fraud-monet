const { Server } = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');


const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

module.exports = {
  pubClient: pubClient,
  subClient: subClient
}