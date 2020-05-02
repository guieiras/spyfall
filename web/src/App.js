import React from 'react';
import Home from './Home';
import Lobby from './Lobby';
import Round from './Round';
import './App.css';

function App({ socket }) {
  const [gameState, setGameState] = React.useState('home');
  const [lobby, setLobby] = React.useState({});
  const [round, setRound] = React.useState({});

  socket.on('lobby', (lobby) => {
    setLobby(lobby);
    setGameState('lobby');
  });

  socket.on('round', (round) => {
    setRound(null);
    setGameState('round');
    setTimeout(() => { setRound(round); }, 1500);
  });

  return (
    <div className="App">
      <h1>Spyfall!</h1>
      { gameState === 'home' && <Home socket={socket} /> }
      { gameState === 'lobby' && <Lobby lobby={lobby} socket={socket} /> }
      { gameState === 'round' && <Round round={round} socket={socket} /> }
    </div>
  );
}

export default App;
