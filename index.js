const app = require('express')();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const rooms = {};

app.use(cors());
app.get('/', (req, res) => {
  res.send('<h1>Spyfall</h1>');
});

io.on('connection', (socket) => {
  console.log('connected ' + socket.id);
  socket.on('disconnect', () => {
    console.log('disconnected ' + socket.id);
  });
});

http.listen(3001, () => {
  console.log('Listening on *:3001');
});
