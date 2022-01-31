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
  '#FFCCEB', // 'Cotton Candy',
  '#DF6770', // 'Candy Pink',
  '#EA9F4E', // 'Sandy Brown',
  '#FBE89B', // 'Green Yellow Crayola',
  '#B9E49F', // 'Granny Smith Apple',
  '#73E5DA', // 'Turquoise',
  '#94B1E9', // 'Wild Blue Yonder',
  '#AE97CD', // 'Wisteria',
  '#D9ABD6', // 'Lilac',
  '#A9B3BF', // 'Cadet Blue Crayola',
  '#000', //Black for Spectators
];

function makeRoomData() {
  let roomData = {
    room_id: '',
    viewers: [],
  };
  roomData.room_id = makeid(Math.floor(Math.random() * 100));

  for (let i = 0; i < 20; i++) {
    roomData.viewers.push(createPlayer(i));
  }
  console.log(roomData);
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
  player.role = i < 10 ? 'player' : 'spectator';
  player.color = player.role === 'player' ? colors[i] : colors[10];
  player.host = i === 0 ? true : false;
  player.fraud = i === 9 ? true : false;
  return player;
}

export default makeRoomData;
