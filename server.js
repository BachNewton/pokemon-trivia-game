// Dependencies
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server, { cors: { origin: '*' } });

const PORT = process.env.PORT || 5000;

app.set('port', PORT);
app.use('/static', express.static(__dirname + '/build/static'));

const TriviaGame = require('./js/TriviaGame.js');

// Routing
app.get('/', function (_, response) {
    response.sendFile(path.join(__dirname, '/build/index.html'));
});

// Start the server
server.listen(PORT, function () {
    console.log('Starting server on port:', PORT);
});

const players = {};

// WebSocket handlers
io.on('connection', function (socket) {
    console.log('new connection:', socket.id);
    players[socket.id] = new TriviaGame();

    socket.on('disconnect', function () {
        console.log('A player has disconnected! ID:', socket.id);
    });
});