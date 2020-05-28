# Spyfall

Very minimalist Spyfall game to be played during a video conference.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node.JS
```

### Installing

This will help you to get a development env running

- Install backend dependencies

```
yarn install
```

- Install frontend dependencies

```
cd web
yarn install
```

- Start backend

```
yarn start
```

- Start frontend

```
cd web
REACT_APP_SOCKET_SERVER_URL="localhost:3001" yarn start
```

## Deployment

This repository includes a script to deploy both apps on a single [heroku](https://www.heroku.com) app.

You **must configure your remote** in order to this work.

```
yarn deploy
```

## Built With

* [Express](https://expressjs.com) - Routes framework
* [Socket.io](https://socket.io) - Websockets framework
* [React](https://reactjs.org) - Frontend library

## Authors

* **[Guilherme Eiras](https://github.com/guieiras)** - *Concept and initial work*
