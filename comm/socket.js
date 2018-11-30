function onConnection(socket) {
    socket.on('update', (data) => {
        console.log('message received: ', data);
        console.log('broadcasting... ');
        socket.broadcast.emit('update', data)
    });
}

var socket = {};
socket.configure = function(server) {
    var io = require('socket.io')(server);
    io.on('connection', onConnection);
}

module.exports = socket;