const router = require('express').Router();
const controller = require('./controllers');

// Creating game room endpoints fraudmonet.com/room
// router.get('/', controller.rooms.getHomePage);
// Room specific endpoints fraudmonet.com/room?[hash code here]
// router.post('/:id', controller.rooms.initializeGame);
router.get('/:id', controller.rooms.getRoomInfo);
router.get('/:id/prompt', controller.rooms.getPrompt);

module.exports = router;