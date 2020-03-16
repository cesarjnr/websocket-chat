const express = require('express');
const socket = require('socket.io');

const app = express();

app.use(express.static('public'));

const server = app.listen(3000, () => {
    console.log('Listening on port 3000...');
});

const io = socket(server);

io.on('connection', socket => {
    console.log('Made socket connection', socket.id);

    // Listens for the message from client and emits (sends) it to the clients
    socket.on('message', data => {
        io.sockets.emit('message', data);
    });

    // Listens for the typing from the client and broadcasts it to all the clients, except the sender
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    });

    // Listens to when someone leaves the chat
    socket.on('disconnect', socket => {
        console.log('Disconnected', socket.id);
    });
});
