const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const randomstring = require('randomstring');
const source = require('./source');
const shuffle = require('shuffle-array');
const rooms = {};

app.use(cors());
app.get('/', (req, res) => {
  res.send('<h1>Spyfall</h1>');
});

function roomLobby(room) {
  return {
    id: room.id,
    players: Object.keys(room.players).map((socketId) => room.players[socketId].player)
  }
}

function dealCards(room) {
  const places = Object.keys(source.places);
  const place = places[Math.floor(Math.random() * places.length)];
  const cards = shuffle(source.roles[place]);
  shuffle(Object.keys(room.players)).forEach((socketId, i) => {
    const socket = room.players[socketId];
    socket.emit('round', {
      place: i === 0 ? '???' : source.places[place],
      role: i === 0 ?  'Espião' : cards[i - 1]
    });
  });
}

io.on('connection', (socket) => {
  console.log('connected ' + socket.id);
  socket.on('disconnect', () => {
    console.log('disconnected ' + socket.id);
    const room = socket.room;
    if (room) {
      delete room.players[socket.id];
      if (room.players === 0) {
        delete rooms[room.id];
      }
    }
  });

  socket.on('new room', ({ player }) => {
    socket.player = player;
    const roomId = randomstring.generate({ length: 6, capitalization: 'uppercase' });
    const room = { id: roomId, state: 'lobby', players: { [socket.id]: socket } };
    rooms[roomId] = room;
    socket.room = room;
    socket.emit('lobby', roomLobby(room));
  });

  socket.on('join room', ({ player, room: roomId }) => {
    socket.player = player;
    const room = rooms[roomId];
    if (room && room.state === 'lobby') {
      room.players[socket.id] = socket;
      socket.room = room;
      Object.keys(room.players).forEach(socketId => {
        room.players[socketId].emit('lobby', roomLobby(room));
      });
    }
  });

  socket.on('round', () => {
    socket.room.state = 'play';
    dealCards(socket.room);
  });
});

http.listen(3001, () => {
  console.log('Listening on *:3001');
});
