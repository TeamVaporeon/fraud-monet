const path = require('path');
const cors = require('cors');
const express = require('express');
const router = require('./routes.js');
const { Server } = require('socket.io');
const { createServer } = require('http');
const { createClient } = require('redis');
const { Emitter } = require('@socket.io/redis-emitter');
const { createAdapter } = require('@socket.io/redis-adapter');
const cookieParser = require('cookie-parser');

// Express Server
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Room endpoint
app.use('', router);

const rooms = {

}

// Implementing Express Server With Socket.io
const httpServer = createServer(app);
const redisClient = createClient({ url : 'redis://localhost:6379' })
const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();
Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createAdapter(pubClient, subClient));
  io.listen(3000);
})
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

// On Client Connecting To Server
io.on('connection', (socket) => {
  var client = io.of('createRoom');
  console.log(`Socket Connected With Id: `, socket.id);
  // Join a room based on room id
  socket.on('room', (url) => {
    socket.room = url.substr(5);
    socket.join(socket.room);
  });

  // Emit handlers
  socket.on('createRoom', (data) => {
    const cookie = socket.handshake.headers.cookie;
    const adapter = io.of('createRoom').adapter;

    socket.broadcast.emit('packet', adapter.pubClient.publish(data));
  });

  socket.on('newUser', (user) => {
    const adapter = io.of('room').adapter;
    adapter.pubClient.publish(data);
    console.log('new user added!')
  })

  socket.on('draw', (mouseData) => {
    // Broadcast mouseData to all connected sockets
    socket.broadcast.to(socket.room).emit('draw', mouseData);
  });

  /* ----- CHATROOM Code ----- */
  socket.on('send_message', (userMessage) => {
    socket.to(userMessage.room).emit('receive_message', userMessage);
  });
  /* ----- End of CHATROOM Code ----- */

  // On user disconnecting
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
});

// Starting The Server That Has Express and Socket.io
const port = 8080;
httpServer.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});