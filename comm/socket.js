function onConnection(socket) {
    socket.on('join', (data) => {
        let boardId = data.boardId;
        if (socket.boardId) {
            socket.leave(socket.boardId);
        }
        socket.boardId = boardId;
        console.log("joining room: ", boardId);
        socket.join(boardId, () => {
            let rooms = Object.keys(socket.rooms);
            console.log("rooms: ", rooms);
        });
    });

    socket.on('update', (data) => {
        console.log('message received: ', data);
        socket.broadcast.to(data.boardId).emit('update', data);
    });

    socket.on('language', (data) => {
        console.log('language update message recieved:', data);
        socket.broadcast.to(data.boardId).emit('language', data);
    });
}

var comm = {};
comm.configure = function(server) {
    io = require('socket.io')(server);
    io.on('connection', onConnection);
}

module.exports = comm;