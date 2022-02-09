
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

    })
  }
}