const argon2 = require('argon2');

module.exports = {
  getHomePage: async function(req, res) {
    console.log(req.url);
    res.status(200).send('Fraud money home page!');
  },
  generateRoomCode: async function(req, res) {
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
  getRoomInfo: async function(req, res) {
    console.log(req.params);
    try {
      const testCode = await argon2.hash(req.params);
      if (await argon2.verify(testCode, req.params)) {
        res.status(200).send('Users');
      } else {
        res.status(400).send('Room doesn\'t exist');
      }
    }
    res.status(200).send(req.params.id);
  },
  addUser: async function(req, res) {
    res.status(201).send('User added');
  },
  updateUser: async function(req, res) {
    res.status(204).send('Updated user');
  },
  getPrompt: async function(req, res) {
    res.status(200).send('Here\'s your prompt');
  }
}