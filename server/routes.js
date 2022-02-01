const router = require('express').Router();
const controller = require('./controllers');

// Creating game room endpoints fraudmonet.com/room
router.get('/', controller.rooms.getHomePage);
router.post('/', controller.rooms.initializeGame);
// Room specific endpoints fraudmonet.com/room?[hash code here]
router.get('/:id', controller.rooms.getRoomInfo);
router.post('/:id', controller.rooms.addUser);
router.put('/:id', controller.rooms.updateUser);
router.get('/:id/prompt', controller.rooms.getPrompt);
router.get('/:id/chat', controller.chats.getChats);
router.post('/:id/chat', controller.chats.saveChat);

module.exports = router;