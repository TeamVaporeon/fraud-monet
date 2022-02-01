const path = require('path');
const cors = require('cors');
const express = require('express');
const { Server } = require('socket.io');
const { createServer } = require('http');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const { v4: uuidv4 } = require('uuid');
const cookie = require('cookie');
const users = [];

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
})

app.post('/', (req, res) => {
  const user = req.body;
  users.push(user)
  console.log(user);
  res.status(201).send(users);
})

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

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

// const session = {}

// On Client Connecting To Server
io.on('connection', (socket) => {

  let users = [];
  // Store session middleware
  // io.use((socket, next) => {
  //   let parsedCookie = cookie.parse(socket.handshake.headers.cookie);
  //   let sessionID = parsedCookie.sessionid;
  //   if (sessionID) {
  //     if (session[sessionID]) {
  //       socket.sessionID = sessionID;
  //       return next()
  //     } else {
  //       session[sessionID] = sessionID;
  //       return next()
  //     }
  //   }
  // })

  console.log(`Socket Connected With Id: `, socket.id);
  socket.broadcast.emit(`Socket Connected With Id: ${socket.id}`);
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