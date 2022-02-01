const rooms = require('../models/index.js');
const path = require('path');
const argon2 = require('argon2');

module.exports = {
  // Create Game endpoint
  getHomePage: async function (req, res) {
    res.cookie('name', 'express', { maxAge: 360000 });
    res.sendFile(path.join(__dirname + '../build/index.html'));
  },
  // Room endpoint
  initializeGame: async function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
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
  getPrompt: async function (req, res) {
    res.status(200).send('Here\'s your prompt');
  }
}