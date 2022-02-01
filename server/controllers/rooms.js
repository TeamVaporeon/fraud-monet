const rooms = require('../models/index.js');
const path = require('path');
const argon2 = require('argon2');

module.exports = {
  getHomePage: async function (req, res) {
    res.cookie('name', 'express', { maxAge: 360000 });
    res.sendFile(path.join(__dirname + '../build/index.html'));
  },
  // run when first user ('host') creates a game
  initializeGame: async function (req, res) {
    console.log(req.params);
    // get random string from req.params
    try {
      // hash string and save in HT
      const roomCode = await argon2.hash(req.params);
      // TODO save user as host
    } catch (err) {
      console.error(err);
    }
    res.status(201).send('Fraud money generate code!');
  },
  getRoomInfo: async function (req, res) {
    console.log(req.params);
    try {
      const testCode = await argon2.hash(req.params);
      if (await argon2.verify(testCode, req.params)) {
        res.status(200).send('Users');
      } else {
        res.status(400).send('Room doesn\'t exist');
      }
    } catch (err) {
      res.status(404).send(err);
    }
  },
  // On non-host user join
  addUser: async function (req, res) {
    // build user object according to data model
    // assign them their cookie -> assign to the id
    // {
    // 	username: string,
    // 	color: string,
    // 	socket-id: string//?
    // 	host: boolean,
    // 	fraud: boolean,
    // 	role: string // spectator/player
    // },
    res.status(201).send('User added');
  },
  updateUser: async function (req, res) {
    res.status(204).send('Updated user');
  },
  getPrompt: async function (req, res) {
    res.status(200).send('Here\'s your prompt');
  }
}