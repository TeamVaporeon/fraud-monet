
module.exports = {
  start: function(io) {
    io.on('connection', (socket) => {
      async function saveDrawing(roomID, coordinates) {
        await pubClient.publish(`${roomID}:drawing`, JSON.stringify(coordinates));
      }

      async function sendDrawing(roomID) {
        await subClient.subscribe(`${roomID}:drawing`, (coords) => {
          socket.emit('send_drawing', coords);
        });
      }

      socket.on('mouse', (mouseData, callback) => {
        // Broadcast mouseData to all connected sockets
        if (rooms[socket.room]) {
          rooms[socket.room].drawing.push(mouseData);
        };

        try {
          saveDrawing(socket.room, mouseData);
          sendDrawing(socket.room);
        } catch(e) {
          console.error(e);
        }
      });
    })
  }
}