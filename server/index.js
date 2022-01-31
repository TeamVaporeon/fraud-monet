const path = require('path');
const cors = require('cors');
const express = require('express');
const router = require('./routes.js');
const { Server } = require('socket.io');
const { createServer } = require('http');
const { createClient } = require('redis');
const { createAdapter } = require('@socket.io/redis-adapter');

// Express Server
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + './build')));

// Base endpoint
app.use('', router);

// Implementing Express Server With Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer);

// On Client Connecting To Server
io.on('connection', (socket) => {
  console.log(`Socket Connected With Id: `, socket.id);
  // Set socket event handlers
});

// Starting The Server That Has Express and Socket.io
const port = 8080;
httpServer.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
