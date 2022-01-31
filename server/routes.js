const router = require('express').Router();
const controller = require('./controllers');

// Creating game room endpoints fraudmonet.com/room
router.get('/', controller.rooms.getHomePage);
router.post('/', controller.rooms.generateRoomCode);
// Room specific endpoints fraudmonet.com/room?[hash code here]
router.get('/room/:id', controller.rooms.getRoomInfo);
router.post('/room/:id', controller.rooms.addUser);
router.put('/room/:id', controller.rooms.updateUser);
router.get('/room/:id/prompt', controller.rooms.getPrompt);
router.get('/room/:id/chat', controller.chats.getChats);
router.post('/room/:id/chat', controller.chats.saveChat);

module.exports = router;