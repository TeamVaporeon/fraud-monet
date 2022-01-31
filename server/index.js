const path = require('path');
const cors = require('cors');
const express = require('express');
const router = require('./routes.js');
const { Server } = require('socket.io');
const { createServer } = require('http');
const cookieParser = require('cookie-parser');

// Express Server
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + './build')));

// Create Room Page
app.get('/', (req, res) => {
  res.cookie('name', 'express', { maxAge: 360000 });
  res.send('This is the Create Game Page');
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

// On Client Connecting To Server
io.on('connection', (socket) => {
  console.log(`Socket Connected With Id: `, socket.id);
  // Join a room based on room id
  socket.on('room', (room) => {
    const subRoom = room.substr(5);
    socket.join(subRoom);

    // Emit handlers
    socket.on('draw', (mouseData) => {
      // Broadcast mouseData to all connected sockets
      socket.broadcast.to(subRoom).emit('draw', mouseData);
    });
  });

  /* ----- CHATROOM Code ----- */
  socket.on('send_message', (userMessage) => {
    socket.to(userMessage.room).emit('receive_message', userMessage);
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
