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
  'Haylie Stevenson'
]

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
  'Cadet Blue Crayola'
]

function makeRoomData() {
  let roomData = {
    room_id: '',
    players: [],
    spectators: []
  }
  roomData.room_id = makeid(Math.floor(Math.random() * 100));

  for (let i = 0; i < 10; i++) {
    roomData.players.push(createPlayer(i))
  }
  for (let i = 11; i < 20; i++) {
    roomData.spectators.push(names[i]);
  }
  return roomData
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}

function createPlayer(i) {
  let player = {}
  player.username = names[i]
  player.role = 'player'
  player.color = colors[i]
  i === 0 ? player.host = true : player.host = false;
  return player
}

console.log(makeRoomData())