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
const editFile = require('edit-json-file');
const rooms = {};
const defaultColors = {
  '#FFCCEB': true, //Cotton Candy
  '#DF6770': true, //Candy Pink
  '#ff69b4': true, //Hot Pink
  '#EA9F4E': true, //Sandy Brown
  '#a52a2a': true, //Brown
  '#ff0000': true, //Red
  '#ffa500': true, //Orange
  '#FBE89B': true, //Green Yellow Crayola
  '#ffff00': true, //Yellow
  '#00ff00': true, //Lime
  '#B9E49F': true, //Granny Smith Apple
  '#008000': true, //Green
  '#73E5DA': true, //Turquoise
  '#94B1E9': true, //Wild Blue Yonder
  '#0000ff': true, //Blue
  '#4b0082': true, //Indigo
  '#800080': true, //Purple
  '#AE97CD': true, //Wisteria
  '#D9ABD6': true, //Lilac
  '#A9B3BF': true, //Cadet Blue Crayola
};

// Data JSON File
var file = editFile(path.join(__dirname, 'data.json'));

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

app.post('/category', (req, res) => {
  res.status(201).send();
});

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

// Implementing Express Server With Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
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
  socket.user.id = socket.id;
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
    userSockets.forEach((sock) => {
      users.push(sock.user);
    });

    // Join room emitters
    socket.emit('users', users);
    socket.broadcast.to(socket.room).emit('newUser', users);
    if (socket.user.host) {
      if (!rooms[socket.room]) {
        rooms[socket.room] = {
          category: '',
          prompt: '',
          colors: Object.assign({}, defaultColors),
        };
        socket.emit('start', rooms[socket.room]);
      }
      console.log(rooms);
      socket.emit('hostConnected');
      socket.emit('user_object', socket.user);
    } else if (rooms[socket.room]) {
      socket.emit('start', rooms[socket.room]);
    };

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

  socket.on('start', async () => {
    const data = await file.toObject();

    let randCat = Math.floor(Math.random() * data.categories.length);
    let category = data.categories[randCat];

    let randPrompt = Math.floor(Math.random() * data[category].length);
    let prompt = data[category][randPrompt];

    rooms[socket.room] = {
      category: category,
      prompt: prompt,
    };
    io.to(socket.room).emit('start', rooms[socket.room]);
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
    if (socket.user.host) {
      delete rooms[socket.room];
    }
    console.log(`${socket.id} disconnected`);
  });

  //------UPDATE PLAYER STATUS-------//
  socket.on('update', async (data) => {
    let userSockets = await io.in(socket.room).fetchSockets();
    users = [];
    userSockets.forEach((sock) => {
      if (sock.user.id === data.id) {
        sock.user = data;
      }
      users.push(sock.user);
    });
    rooms[socket.room].colors[data.color] =
      !rooms[socket.room].colors[data.color];
    console.log(rooms[socket.room].colors);
    io.to(socket.room).emit('availColors', rooms[socket.room].colors);
    io.to(socket.room).emit('users', users);
  });
});

// Starting The Server That Has Express and Socket.io
const port = 8080;
httpServer.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
