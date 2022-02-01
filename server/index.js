const path = require('path');
const cors = require('cors');
const express = require('express');
const router = require('./routes.js');
const { Server } = require('socket.io');
const { createServer } = require('http');
// const { createClient } = require('redis');
// const { createAdapter } = require('@socket.io/redis-adapter');
const cookieParser = require('cookie-parser');

// Express Server
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// Create Room Page
app.get('/', (req, res) => {
  console.log(`CREATE PAGE`);
  res.cookie('name', 'express', { maxAge: 360000 });
  // console.log('Made it to /: Cookie is ', newCookie);
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
// Room endpoint
app.use('/room', router);

// Implementing Express Server With Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

// const pubClient = createClient({ url: 'redis://localhost:6379' });
// const subClient = pubClient.duplicate();

// Promise.all([pubClient.connect(), subClient.connect()])
//   .then(() => {
//     io.adapter(createAdapter(pubClient, subClient));
//     io.listen(3000);
//   })

// On Client Connecting To Server
io.on('connection', (socket) => {

  console.log(`Socket Connected With Id: `, socket.id);
  // Join a room based on room id
  socket.on('room', (url) => {
    socket.room = url;
    socket.join(socket.room);
  });
  // Emit handlers
  socket.on('createRoom', (data) => {
    console.log('CREATE ROOM!!!!!')
    const cookie = socket.handshake.headers.cookie;
    console.log('COOkie', cookie);

  });
  socket.on('draw', (mouseData) => {
    // Broadcast mouseData to all connected sockets
    socket.broadcast.to(socket.room).emit('draw', mouseData);
  });

  /* ----- CHATROOM Code ----- */
  socket.on('send_message', (userMessage) => {
    socket.broadcast.to(socket.room).emit('receive_message', userMessage);
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
