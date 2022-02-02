const path = require('path');
const cors = require('cors');
const argon2 = require('argon2');
const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const cookieParser = require('cookie-parser');
const { InMemorySessionStore } = require('./sessionStore');
const sessionStore = new InMemorySessionStore();
const cookie = require('cookie');
const rooms = {};

// Express Server
const app = express();
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


// Socket middleware
io.use((socket, next) => {
  const user = socket.handshake.auth.user;
  user.id = socket.id;
  const cookies = socket.handshake.headers.cookie;
  const s = cookie.parse(cookies);
  const sessionID = s.sessionid;

  if (sessionID) {
    const session = sessionStore.findSession(sessionID);
    console.log('SESSION', session);
    if (session) {
      socket.sessionID = sessionID;
      socket.userID = session.userID;
      socket.username = session.username
      socket.emit('user_object', user);
      console.log('IN SESSION SOCKET', socket);
      return next();
    }
  }
  const username = socket.handshake.auth.user.username;
  if (!username) {
    return next(new Error('Invalid username'));
  }

  const hashIDs = async () => {
    try {
      const hash = await argon2.hash(username)
      socket.sessionID = hash;
      socket.userID = hash;
    } catch (err) {
      console.error(err);
    }
  }
  hashIDs();
  socket.username = username;
  socket.user = user;
  socket.emit('user_object', user);
  next();
});

// On Client Connecting To Server
io.on('connection', (socket) => {
  console.log(`Socket Connected With Id: `, socket.id);
  let users = [];

  // Print any event received by Client
  socket.onAny((e, ...args) => {
    console.log(e, args);
    console.log(sessionStore);
  });

  // Join a room based on room id
  socket.on('joinRoom', async (url) => {
    socket.room = url;
    socket.join(socket.room);

    let userSockets = await io.in(socket.room).fetchSockets();
    userSockets.forEach(sock => {
      users.push(sock.user);
    });

    // Join room emitters
    socket.emit('users', users);
    socket.broadcast.to(socket.room).emit('newUser', users);
    if (socket.user.host) {
      socket.emit('hostConnected');
      socket.emit('user_object', socket.user);
    };
    socket.emit('connected');

    // Session emitter
    sessionStore.saveSession(socket.sessionID, socket.handshake.auth.user);
    socket.emit('session', {
      sessionID: socket.sessionID,
      userID: socket.userID
    });
  });

  // Emit handlers
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
  socket.on('disconnect', async () => {
    const matchingSockets = await io.in(socket.userID).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      socket.broadcast.emit('user disconnected', socket.userID);
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: false,
      })
    }
    console.log(`${socket.id} disconnected`);
  });
});

// Starting The Server That Has Express and Socket.io
const port = 8080;
httpServer.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});