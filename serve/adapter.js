const { createClient } = require('redis');

const pubClient = createClient({ host: 'localhost', port: 6379});
const subClient = pubClient.duplicate();

module.exports = {
  pubClient: pubClient,
  subClient: subClient,
}