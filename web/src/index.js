import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import './index.css';
import App from './App';

const socket = io('localhost:3001');

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
  document.getElementById('root')
);
