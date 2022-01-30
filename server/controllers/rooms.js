
module.exports = {
  getHomePage: async function(req, res) {
    console.log(req.url);
    res.status(200).send('Fraud money home page!')
  },
  getRoomInfo: async function(req, res) {
    console.log(req.params);
    res.send(req.params.id);
  })
}