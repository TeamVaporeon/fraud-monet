// /--------Dependencies--------/
const path = require('path');
const cors = require('cors');
const { log } = require('console');
const cookieParser = require('cookie-parser');

// /--------Server--------/
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cores: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// /--------In Memory Data--------/
const { roomData, defaultColors } = require('./data.js');

// /--------Express Middleware--------/
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('build'));

// /--------Socket Middleware--------/
const ioMiddleware = require('./middleware/ioMiddleware.js');
ioMiddleware.startAdapter(io);

// /--------Modules--------/
const users = require('./controllers/users.js');
const rooms = require('./controllers/rooms.js');
const drawing = require('./controllers/drawing.js');
users.start(io);
rooms.start(io);
drawing.start(io);


// /--------HTTP Endpoints--------/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
})

app.get('/room/:id', (req, res) => {
  let room = `/${req.params.id}`;
  if (roomData[room]) {
    res.status(200).send();
  } else {
    res.status(301).send();
  }
});

app.get('/usernames/:id', (req, res) => {
  let room = `/${req.params.id}`;
  if(roomData[room]) {
    res.json(roomData[room].users);
  } else {
    res.status(404).send();
  }
});

app.post('/category', (req, res) => {
  res.status(201).send();
});

// /--------Listener--------/
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server listening at port ${port}`);
})