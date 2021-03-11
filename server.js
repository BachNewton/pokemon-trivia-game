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

app.get('/service-worker.js', function (_, response) {
    response.sendFile(path.join(__dirname, '/build/service-worker.js'));
});

app.get('/service-worker.js.map', function (_, response) {
    response.sendFile(path.join(__dirname, '/build/service-worker.js.map'));
});

// Start the server
server.listen(PORT, function () {
    console.log('Starting server on port:', PORT);
});

/** @type {Object<string, TriviaGame>} */
const players = {};

// WebSocket handlers
io.on('connection', function (socket) {
    console.log('Connection - ID:', socket.id);
    players[socket.id] = new TriviaGame(socket);

    socket.on('disconnect', function () {
        console.log('Disconnection - ID:', socket.id);
        delete players[socket.id]
    });

    socket.on('answer', function (guess) {
        players[socket.id].checkAnswer(guess);
    });

    socket.on('ready', function () {
        players[socket.id].sendQuestion();
    });
});