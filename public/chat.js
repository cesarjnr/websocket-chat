const socket = io(window.location.origin);

const name = document.getElementById('name');
const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const answer = document.getElementById('answer');

// Emit the event (a message) to the server
btn.addEventListener('click', () => {
    socket.emit('message', {
        message: message.value,
        name: name.value
    });

    message.value = '';
});

// Emit the event (typing) to the server
message.addEventListener('keypress', () => {
    socket.emit('typing', name.value);
});

// Listen to receive a message from the server
socket.on('message', data => {
    answer.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>';
});

// Listen to receive a typing data from the server
socket.on('typing', data => {
    answer.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
