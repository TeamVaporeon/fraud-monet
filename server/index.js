const path = require('path');
const cors = require('cors');
const express = require('express');
const router = require('./routes.js');
const { Server } = require('socket.io');
const { createServer } = require('http');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');

// Express Server
const app = express();
app.use(session({
  genid: function (req) {
    return uuidv4();
  },
  secret: 'cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 360000 }
}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
})

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

app.use('', router);
// Implementing Express Server With Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});


// Persistent Session
io.use((socket, next) => {
  const user = socket.handshake.auth.user;
  // const sessionID = socket.handshake.auth;
  // console.log('SESSION', sessionID);
  socket.user = user;
  socket.emit('name', user.username);
  next();
});

// On Client Connecting To Server
io.on('connection', (socket) => {

  const users = [];
  console.log(`Socket Connected With Id: `, socket.id);
  // Join a room based on room id
  socket.on('joinRoom', async (url) => {
    // users.push(socket.username);
    socket.room = url;
    socket.join(socket.room);
    let userSockets = await io.in(socket.room).fetchSockets();
    userSockets.forEach(sock => {
      users.push(sock.user);
    });
    socket.emit('users', users);
    socket.broadcast.to(socket.room).emit('newUser', socket.user);
  });

  // Emit handlers
  socket.on('createRoom', (data) => {
    const adapter = io.of('createRoom').adapter;
    socket.broadcast.emit('packet', adapter.pubClient.publish(data));
  });

  socket.on('newUser', (user) => {
    const adapter = io.of('room').adapter;
    adapter.pubClient.publish(user);
    console.log('new user added!')
  })

  socket.on('draw', (mouseData) => {
    // Broadcast mouseData to all connected sockets
    socket.broadcast.to(socket.room).emit('draw', mouseData);
  });

  /* ----- CHATROOM Code ----- */
  socket.on('send_message', (userMessage) => {
    socket.broadcast.to(socket.room).emit('receive_message', userMessage);
  });

  socket.on('username', (username) => {
    socket.emit('name', username);
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