const path = require('path');
const cors = require('cors');
const argon2 = require('argon2');
const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const { saveUser, sessionStore, initializeUser } = require('./controllers/users');
const cookieParser = require('cookie-parser');
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

app.get('/room/:id', (req, res) => {
  let room = `/${req.params.id}`;
  if (rooms[room]) {
    res.status(200).send();
  } else {
    console.log('No room', rooms);
    res.status(301).send();
  }
});

// Implementing Express Server With Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  socket.room = url;
  socket.join(socket.room);
  socket.user ? socket.user.id = socket.id : socket.user = {};
  console.log(`Socket Connected With Id: `, socket.id);

  saveUser(socket)

  // Print any event received by Client
  socket.onAny((e, ...args) => {
    console.log(e, args);
  });

  // Join a room based on room id
  socket.on('joinRoom', async (url) => {
    rooms[socket.room].users = [];
    initializeUser(socket, url, rooms[url], (e, sock) => {
      if (e) console.error(e.message);
      socket = sock;
    });

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
          chats: [],
          votes: {},
          turns: 0,
        };
        socket.emit('start', rooms[socket.room]);
      }
      socket.emit('hostConnected');
      socket.emit('user_object', socket.user);
    } else if (rooms[socket.room]) {
      let messages = rooms[socket.room].chats;
      socket.emit('messages_for_new_users', messages);
      socket.emit('start', rooms[socket.room]);
    };

    // Session emitter
    console.log('SOCKET USER', socket.user);
    socket.emit('session', {
      sessionID: socket.handshake.auth.sessionID,
      user: socket.handshake.auth.user
    });
    // console.log(socket.user);

    socket.on('connected', (cookie) => {
      const session = sessionStore.findSession(cookie.sessionID);
      if (session) {
        socket.user = session;
        socket.sessionID = cookie.sessionID;
        users.forEach(user => {
          if (user.sessionID === cookie.sessionID) {
            user = session;
          }
        })
      }
      io.to(socket.room).emit('users', users);
    });
  });

  // Emit handlers
  socket.on('mouse', (mouseData) => {
    // Broadcast mouseData to all connected sockets
    socket.broadcast.to(socket.room).emit('mouse', mouseData);
  });

  socket.on('turn', (turn) => {
    rooms[socket.room].turns++;
    // if (rooms[socket.room].turns % players)
    socket.to(socket.room).emit('turn', turn);
  });

  socket.on('guess', (guess) => {
    io.to(socket.room).emit('guess', guess);
  });

  socket.on('vote', (data) => {
    if (rooms[socket.room].votes[data]) {
      rooms[socket.room].votes[data]++;
    } else {
      rooms[socket.room].votes[data] = 1;
    }
    io.to(socket.room).emit('get_votes', rooms[socket.room].votes);
  });

  socket.on('new_game', () => {
    rooms[socket.room].category = '';
    rooms[socket.room].prompt = '';
    rooms[socket.room].votes = {};
    rooms[socket.room].turns = 0;
  });

  socket.on('prompt', (data) => {
    rooms[socket.room].category = data.category;
    rooms[socket.room].prompt = data.prompt;
  });

  socket.on('start', async (players) => {
    if (!rooms[socket.room].category) {
      const data = await file.toObject();
      let randCat = Math.floor(Math.random() * data.categories.length);
      let category = data.categories[randCat];
      let randPrompt = Math.floor(Math.random() * data[category].length);
      let prompt = data[category][randPrompt];
      rooms[socket.room].category = category;
      rooms[socket.room].prompt = prompt;
    } else {
      console.log(`${socket.room} doesn't exist`);
    }
    let x = true;
    while (x) {
      let i = Math.floor(Math.random() * players.length);
      if (players[i].role === 'player') {
        players[i].fraud = true;
        console.log(players[i]);
        x = false;
      }
    }
    io.to(socket.room).emit('users', players);
    io.to(socket.room).emit('start', rooms[socket.room]);
  });

  socket.on('gameStart', () => {
    io.to(socket.room).emit('gameStart', rooms[socket.room]);
  });

  socket.on('round', (req) => {
    io.to(socket.room).emit('round', req);
  });

  socket.on('judged', () => {
    io.to(socket.room).emit('judged');
  });

  /* ----- CHATROOM Code ----- */
  socket.on('send_message', (userMessage) => {
    rooms[socket.room].chats.push(userMessage);
    io.to(socket.room).emit('receive_message', userMessage);
  });
  /* ----- End of CHATROOM Code ----- */

  // On user disconnecting
  socket.on('disconnect', async () => {
    const matchingSockets = await io.in(socket.room).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      socket.broadcast.emit('user disconnected', socket.userID);
      sessionStore.saveSession(socket.handshake.auth.sessionID, socket.handshake.auth.user);
    }
    // if (socket.user.host) {
    //   delete rooms[socket.room];
    // }
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
    try {
      rooms[socket.room].colors[data.color] = !rooms[socket.room].colors[data.color];
    } catch (err) {
      console.log(err);
    }
    io.to(socket.room).emit('availColors', rooms[socket.room].colors);
    io.to(socket.room).emit('users', users);
  });
});

// Starting The Server That Has Express and Socket.io
const port = 8080;
httpServer.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});

module.exports = {
  io: io
}