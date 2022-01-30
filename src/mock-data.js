const names = [
  'Ethan Miles',
  'Hazel Hill',
  'Eduardo Valentine',
  'Bianca Harvey',
  'Eva Campos',
  'Tomas Drake',
  'Priscilla Wallace',
  'Lorelai Logan',
  'Aubrey Hodges',
  'Harmony Prince',
  'Ximena Mcguire',
  'Nicholas Rosales',
  'Amira Bailey',
  'Ismael Adams',
  'Viviana Weaver',
  'Eugene Jensen',
  'Mireya Young',
  'Francisco Bautista',
  'Zaniyah Oneill',
  'Nehemiah Douglas',
  'Regan Gilbert',
  'Haylie Stevenson',
];

const colors = [
  'Cotton Candy',
  'Candy Pink',
  'Sandy Brown',
  'Green Yellow Crayola',
  'Granny Smith Apple',
  'Turquoise',
  'Wild Blue Yonder',
  'Wisteria',
  'Lilac',
  'Cadet Blue Crayola',
];

function makeRoomData() {
  let roomData = {
    room_id: '',
    viewers: [],
  };
  roomData.room_id = makeid(Math.floor(Math.random() * 100));

  for (let i = 0; i < 10; i++) {
    roomData.viewers.push(createPlayer(i));
  }
<<<<<<< HEAD:server/mock-data.js
  for (let i = 11; i < 20; i++) {
    roomData.spectators.push(names[i]);
=======
  for (let i = 10; i < 20; i++) {
    roomData.viewers.push({
      id: i,
      username: names[i],
      role: 'spectator',
      color: null,
      host: false,
    });
>>>>>>> c24f009a43aa6712c87dc9979b35f6c1598155a7:src/mock-data.js
  }
  return roomData;
}

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function createPlayer(i) {
  let player = {};
  player.id = i;
  player.username = names[i];
  player.role = 'player';
  player.color = colors[i];
  i === 0 ? (player.host = true) : (player.host = false);
  i === 9 ? (player.fraud = true) : (player.fraud = false);
  return player;
}

export default makeRoomData;
