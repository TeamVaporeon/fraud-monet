import React, {useState} from 'react';
import { io } from 'socket.io-client';

// const getHome = async () => {
//   const response = await fetch('http://localhost:8080');
//   console.log(response);
// }
// getHome();

// Connect client's socket to server
const socket = io();
// Get the room id
console.log(window.location.pathname);
// Emit the room id to the server so client can be put in a room
socket.emit('room', window.location.pathname);
var generateRandString = () => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for(var i = 0; i < 8; i++) {
    result+= characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;

}


var CreateRoom = (props) => {

  const [name, setName] = useState('');
  return(
    <div>
      <form>
        <label>
          Enter Your Username:
          <input type="text" onChange={(e)=> {
            setName(e.target.value);
          }}/>
          <button type="submit" text="Create Room" onClick={(e) => {
            e.preventDefault();
            var idString = generateRandString();
            socket.emit('createRoom',{username: name, roomId: idString, color: '#000', host: true, fraud: false, role: "player"})
            }}>Create Room </button>
        </label>
      </form>
    </div>
  )
}

export default CreateRoom;