import React from 'react';
import './Lobby.css';

export default function Lobby({ lobby, socket }) {
  return (
    <div className="Lobby">
      <p>Sala {lobby.id}</p>
      <ul>
        {
          lobby.players.map((player, i) => <li key={i}>{player}</li>)
        }
      </ul>
      <button disabled={lobby.players < 3}>Iniciar Jogo</button>
    </div>
  );
}
