const router = require('express').Router();
const controller = require('./controllers');

router.get('/room/', controller.rooms.getHomePage);
router.post('/room/', controller.rooms.generateRoomCode);
//fraudmonet.com/room?[hash code here]
router.get('/room/:id', controller.rooms.getRoomInfo);

module.exports = router;