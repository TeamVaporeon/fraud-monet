
module.exports = {
  getHomePage: async function(req, res) {
    console.log(req.url);
    res.status(200).send('Fraud money home page!');
  },
  generateRoomCode: function(req, res) {
    console.log(req.body);
    // get random string
    // hash string and save in HT
    // save user as host
    res.status(201).send('Fraud money generate code!');
  },
  getRoomInfo: async function(req, res) {
    console.log(req.params);
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