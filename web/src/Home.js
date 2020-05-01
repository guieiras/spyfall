import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="Home">
      <p>Insira o código da sala ou crie uma nova</p>
      <input placeholder="Código da Sala" />
      <div>
        <button className="btn btn-new-room">Nova Sala</button>
        <button className="btn btn-join">Entrar</button>
      </div>
    </div>
  );
}
