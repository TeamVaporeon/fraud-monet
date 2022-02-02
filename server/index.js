const path = require('path');
const cors = require('cors');
const argon2 = require('argon2');
const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const cookieParser = require('cookie-parser');
const { InMemorySessionStore } = require('./sessionStore');
const sessionStore = new InMemorySessionStore();
// const session = require('express-session');
// const { v4: uuidv4 } = require('uuid');
const cookie = require('cookie');
const rooms = {};

// Express Server
const app = express();
// app.use(session({
//   genid: function (req) {
//     return uuidv4();
//   },
//   secret: 'cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { maxAge: 360000 }
// }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

app.post('/host/:id', (req, res) => {
  res.status(201).send();
})

app.get('/host/:id', (req, res) => {
  const room = req.params.id;
  res.send(rooms[room]);
})

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Implementing Express Server With Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


// Persistent Session
io.use((socket, next) => {
  const user = socket.handshake.auth.user;
  user.id = socket.id;
  // const sessionID = socket.handshake.headers
  const cookies = cookie.parse(socket.handshake.headers)
  console.log(cookies);
  const sessionID = cookies.sessionid;
  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.username;
      socket.emit('user_object', user);
      return next();
    }
  }
  const username = socket.handshake.auth.user.username;
  if (!username) {
    return next(new Error('Invalid username'));
  }


  argon2.hash(username)
    .then(hash => socket.sessionID = hash)
    .catch(err => console.error(err));
  argon2.hash(username)
    .then(hash => socket.userID = hash)
    .catch(err => console.error(err));
  socket.username = username;
  socket.user = user;
  socket.emit('user_object', user);
  next();
});

// const session = {}

// On Client Connecting To Server
io.on('connection', (socket) => {
  console.log(`Socket Connected With Id: `, socket.id);
  let users = [];

  // Persist Session
  sessionStore.saveSession(socket.sessionID, socket.handshake.auth.user);
  socket.emit('session', {
    sessionID: socket.sessionID,
    userID: socket.userID
  })

  // Print any event received by Client
  socket.onAny((e, ...args) => {
    console.log(e, args);
    console.log(sessionStore);
  });

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
    socket.broadcast.to(socket.room).emit('newUser', users);
    if (socket.user.host) {
      socket.emit('hostConnected');
      socket.emit('user_object', socket.user);
    };
    socket.emit('connected');
  });

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
    })
    socket.emit('packet', data);
  });

  socket.on('mouse', (mouseData) => {
    // Broadcast mouseData to all connected sockets
    socket.broadcast.to(socket.room).emit('mouse', mouseData);
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