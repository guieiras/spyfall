import React from 'react';
import './Home.css';

export default function Home({ socket }) {
  const [name, setName] = React.useState('');
  const [roomCode, setRoomCode] = React.useState('');

  function createRoom() {
    socket.emit('new room', { player: name });
  }

  function joinRoom() {
    socket.emit('join room', { player: name, room: roomCode });
  }

  return (
    <div className="Home">
      <p>Quem é você?</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu Nome" />
      <p>Insira o código da sala ou crie uma nova</p>
      <input value={roomCode} onChange={(e) => setRoomCode(e.target.value)} placeholder="Código da Sala" />
      <div>
        <button className="btn btn-new-room" onClick={createRoom}>Nova Sala</button>
        <button className="btn btn-join" onClick={joinRoom}>Entrar</button>
      </div>
    </div>
  );
}
