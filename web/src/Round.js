import React from 'react';
import places from './source';
import './Round.css';

export default function Round({ round, socket }) {
  function newRound() {
    socket.emit('round');
  }

  return (
    <div className="Round">
      {
        round
        ? <div>
          <p>Seu lugar</p>
          <p>
            <b>{round.place}</b>
          </p>
          <p>Sua função</p>
          <p>
            <b>{round.role}</b>
          </p>
        </div>
        : <p>Embaralhando</p>
      }
      <p>
        Lista de Lugares
      </p>
      <ul>
        { Object.values(places).sort().map((place) => <li key={place}>{place}</li>)}
      </ul>
      <button onClick={newRound}>
        Embaralhar
      </button>
    </div>
  );
}
