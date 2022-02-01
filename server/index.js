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
<<<<<<< HEAD
app.use(express.static(path.join(__dirname + './build')));
app.use('', router);
=======
app.use(express.static('build'));

// Create Room Page
app.get('/', (req, res) => {
  console.log(`CREATE PAGE`);
  res.cookie('name', 'express', { maxAge: 360000 });
  // console.log('Made it to /: Cookie is ', newCookie);
  res.sendFile(path.join(__dirname + '../build/index.html'));
});
// Room endpoint
app.use('/room', router);
>>>>>>> 8f09df6cb2e4061b8eee498d4e64a38216d8ff76

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
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  }
});

const pubClient = createClient({ url: 'redis://localhost:6379' });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()])
  .then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    io.listen(3000);
  })


// On Client Connecting To Server
io.on('connection', (socket) => {

  console.log(`Socket Connected With Id: `, socket.id);
<<<<<<< HEAD
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
=======
  // Join a room based on room id
  socket.on('room', (url) => {
    socket.room = url.substr(5);
    socket.join(socket.room);
  });
  // Emit handlers
  socket.on('createRoom', (data) => {
    console.log('CREATE ROOM!!!!!')
    // console.log(socket.handshake.headers.cookie);
    const cookie = socket.handshake.headers.cookie;
    // console.log('SOCKET', socket);
    // console.log('DATA', data);
    console.log('COOkie', cookie);

    // data.username
    // data.roomId
    // check/set cookie
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
>>>>>>> 8f09df6cb2e4061b8eee498d4e64a38216d8ff76

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
