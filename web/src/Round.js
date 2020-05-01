import React from 'react';
import places from './source';
import './Round.css';

export default function Round({ round, socket }) {
  function newRound() {
    socket.emit('round');
  }

  return (
    <div className="Round">
      <p>Seu lugar</p>
      <p>
        <b>{round.place}</b>
      </p>
      <p>Sua função</p>
      <p>
        <b>{round.role}</b>
      </p>
      <p>
        Lista de Lugares
      </p>
      <ul>
        { Object.values(places).map((place) => <li>{place}</li>)}
      </ul>
      <button onClick={newRound}>
        Nova rodada
      </button>
    </div>
  );
}
