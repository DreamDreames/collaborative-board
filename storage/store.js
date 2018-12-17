var redis = require("redis"),
    client = redis.createClient();

var store = {};

store.getBoard = function(boardId, onError, onSuccess) {
    client.get(boardId, function(err, reply) {
        if (err) {
            onError(err);
            return;
        }
        onSuccess(reply);
    });
}

store.updateBoard = function(boardId, data) {

}

module.exports = store;