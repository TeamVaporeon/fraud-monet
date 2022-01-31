const path = require('path');
const cors = require('cors');
const express = require('express');
const router = require('./routes.js');
const { Server } = require('socket.io');
const { createServer } = require('http');

// Express Server
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + './build')));

// Base endpoint
app.use('/room/', router);

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
  // Set socket event handlers

  /* ----- CHATROOM Code ----- */
  socket.on('send_message', (userMessage) => {
    socket.to(userMessage.room).emit('receive_message', userMessage);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected!`)
  });
  /* ----- End of CHATROOM Code ----- */
});

// Starting The Server That Has Express and Socket.io
const port = 8080;
httpServer.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
