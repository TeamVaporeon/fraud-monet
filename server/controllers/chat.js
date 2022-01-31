const chats = require('../models/index.js');

module.exports = {
  getChats: async function(req, res) {
    //
    res.status(200).send('Here are your chats');
  },
  saveChat: async function(req, res) {
    // Generate timestamp
    // Save object with username, chat message, and timestamp
    res.status(201).send('Saved chat');
  }
}