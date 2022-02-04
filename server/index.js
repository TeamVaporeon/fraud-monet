const path = require('path');
const cors = require('cors');
const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
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
  '#ff6600': true, //Orange
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
    res.status(301).send();
  }
});

app.get('/usernames/:id', (req, res) => {
  let room = `/${req.params.id}`;
  if (rooms[room]) {
    res.json(rooms[room].users);
  } else {
    res.status(404).send();
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

// Persistent Session
io.use((socket, next) => {
  const user = socket.handshake.auth.user;
  user.id = socket.id;
  socket.user = user;
  socket.emit('user_object', user);
  next();
});

// On Client Connecting To Server
io.on('connection', (socket) => {
  socket.user.id = socket.id;
  console.log(`Socket Connected With Id: `, socket.id);
  socket.user.id = socket.id;
  let users = [];

  // Join a room based on room id
  socket.on('joinRoom', async (url) => {
    // users.push(socket.username);
    socket.room = url;
    socket.join(socket.room);
    let userSockets = await io.in(socket.room).fetchSockets();
    userSockets.forEach((sock) => {
      if (rooms[socket.room] && rooms[socket.room].currentFraud) {
        if (sock.user.id === rooms[socket.room].currentFraud.id) {
          sock.user.fraud = true;
        };
      };
      users.push(sock.user);
    });
    socket.emit('users', users);
    socket.broadcast.to(socket.room).emit('newUser', users);
    if (socket.user.host) {
      if (!rooms[socket.room]) {
        rooms[socket.room] = {
          category: '',
          prompt: '',
          colors: Object.assign({}, defaultColors),
          chats: [],
          users: { [socket.user.username]: 1 },
          customPrompt: {
            isCustom: false,
            category: '',
            prompt: '',
          },
          votes: {},
          turns: 0,
          drawing: [],
          started: false,
          currentFraud: null
        };
        socket.emit('start', rooms[socket.room]);
      }

      socket.emit('hostConnected');
      socket.emit('user_object', socket.user);
    } else if (rooms[socket.room]) {
      rooms[socket.room].users[socket.user.username] = 1;
      let messages = rooms[socket.room].chats;
      socket.emit('messages_for_new_users', messages);
      socket.emit('start', rooms[socket.room]);
      if (rooms[socket.room].started) {
        socket.emit('gameStart');
      };
      socket.emit('load_drawing', rooms[socket.room].drawing);
      socket.broadcast
        .to(socket.room)
        .emit('load_drawing', rooms[socket.room].drawing);
    };
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
    });
    socket.emit('packet', data);
  });

  socket.on('mouse', (mouseData) => {
    // Broadcast mouseData to all connected sockets
    if (rooms[socket.room]) {
      rooms[socket.room].drawing.push(mouseData);
    };
    socket.broadcast.to(socket.room).emit('mouse', mouseData);
  });

  socket.on('turn', (turn) => {
    rooms[socket.room].turns++;
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

  socket.on('score', (data) => {
    if (data.winner === 'fraud') {
      data.users.forEach((user) => {
        if (user.fraud || user.role === 'qm') {
          user.score += 2;
        }
      });
    } else {
      data.users.forEach((user) => {
        if (user.role === 'player' && !user.fraud) {
          user.score += 1;
        }
      });
    }
    io.to(socket.room).emit('users', data.users);
  });

  socket.on('new_game', () => {
    rooms[socket.room].category = '';
    rooms[socket.room].prompt = '';
    rooms[socket.room].votes = {};
    rooms[socket.room].turns = 0;
    rooms[socket.room].customPrompt = {
      isCustom: false,
      category: '',
      prompt: '',
    };
    rooms[socket.room].started = false;
  });

  socket.on('prompt', (data) => {
    rooms[socket.room].customPrompt = {
      isCustom: true,
      category: data.category,
      prompt: data.prompt,
    };
  });

  socket.on('start', async (players) => {
    if (!rooms[socket.room].customPrompt.isCustom) {
      const data = await file.toObject();
      let randCat = Math.floor(Math.random() * data.categories.length);
      let category = data.categories[randCat];
      let randPrompt = Math.floor(Math.random() * data[category].length);
      let prompt = data[category][randPrompt];
      rooms[socket.room].category = category;
      rooms[socket.room].prompt = prompt;
    } else {
      rooms[socket.room].category = rooms[socket.room].customPrompt.category;
      rooms[socket.room].prompt = rooms[socket.room].customPrompt.prompt;
    }
    let currentPlayers = [];
    let spectators = [];
    players.forEach((p) => {
      if (p.role === 'player') {
        if (p.fraud) {
          p.fraud = false;
        };
        currentPlayers.push(p);
      } else {
        p.fraud = false;
        spectators.push(p);
      };
    });
    let i = Math.floor(Math.random() * currentPlayers.length);
    currentPlayers[i].fraud = true;
    rooms[socket.room].currentFraud = currentPlayers[i];
    io.to(socket.room).emit('users', [...currentPlayers, ...spectators]);
    io.to(socket.room).emit('start', rooms[socket.room]);
  });

  socket.on('gameStart', () => {

    rooms[socket.room].drawing = [];
    rooms[socket.room].started = true;
    io.to(socket.room).emit('gameStart', rooms[socket.room]);
  });

  socket.on('round', (req) => {
    io.to(socket.room).emit('round', req);
  });

  socket.on('judged', (char) => {
    io.to(socket.room).emit('judged', char === 'Y' ? 'fraud' : 'player');
  });

  /* ----- CHATROOM Code ----- */
  socket.on('send_message', (userMessage) => {
    rooms[socket.room].chats.push(userMessage);
    io.to(socket.room).emit('receive_message', userMessage);
  });
  /* ----- End of CHATROOM Code ----- */

  // On user disconnecting
  socket.on('disconnect', () => {
    if (socket.user.host) {
      delete rooms[socket.room];
    } else if (rooms[socket.room]) {
      if (rooms[socket.room].users[socket.user.username]) {
        delete rooms[socket.room].users[socket.user.username];
      }
    }
    io.to(socket.room).emit('hostLeft');
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
    if (data.color !== '#000') {
      rooms[socket.room].colors[data.color] =
        !rooms[socket.room].colors[data.color];
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
