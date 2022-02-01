const path = require('path');
const cors = require('cors');
const express = require('express');
const router = require('./routes.js');
const { Server } = require('socket.io');
const { createServer } = require('http');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');
const cookieParser = require('cookie-parser');

// Express Server
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + './build')));
app.use('', router);

// Live data
// Countdown timer
// Drawing
// Voting
// Chat
//
// Host get's cookie right away
// Test host emit event on create game
// Store first player in user data model
// Redirect player to game room
//
// On non-host join
// make get request -> checks for cookie
  // if no cookie set on
  // if cookie don't matter
  // send html
// Set up their connection via emit
// on username submit -> store as new user

// Room endpoint
app.use('/room', router);

// Implementing Express Server With Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer);


// On Client Connecting To Server
io.on('connection', (socket) => {
  console.log(`Socket Connected With Id: `, socket.id);
  console.log(socket);

  // Check cookies
  const cookief = socket.handshake.headers.cookie;
  const cookies = cookie.parse(socket.handshake.headers.cookie);
  console.log(cookies);

  // Join a room based on room id
  socket.on('room', (room) => {
    const subRoom = room.substr(5);
    socket.join(subRoom);
    socket.on('draw', (mouseData) => {
      // Broadcast mouseData to all connected sockets
      socket.broadcast.to(subRoom).emit('draw', mouseData);
    });
  });

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
