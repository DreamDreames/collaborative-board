var express = require('express');
var path = require('path');
var router = express.Router();

function onConnection(socket) {
    socket.on('update', (data) => {
        console.log('message received: ', data);
        socket.broadcast.emit('update', data)
    });
}

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    var io = req.app.get('socketio');
    io.on('connection', onConnection);
    res.sendFile(path.resolve('views/index.html'));
});

module.exports = router;