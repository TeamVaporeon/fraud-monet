const { createAdapter } = require('@socket.io/redis-adapter');
const { pubClient, subClient } = require('../adapter.js');

module.exports = {
  startAdapter: function(io) {
    io.use((socket, next) => {
      Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
        io.listen(5000);
      });
      next();
    });
  }
}