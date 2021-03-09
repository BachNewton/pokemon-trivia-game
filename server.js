// Dependencies
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/build/static'));

// Routing
app.get('/', function (_, response) {
    response.sendFile(path.join(__dirname, '/build/index.html'));
});

// Start the server
server.listen(5000, function () {
    console.log('Starting server on port 5000');
});

// WebSocket handlers
io.on('connection', function (socket) {
    console.log('new connection:', socket.id);

    socket.on('disconnect', function () {
        console.log('A player has disconnected! ID: ' + socket.id);
    });
});