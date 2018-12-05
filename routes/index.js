var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/:boardId', function(req, res, next) {
    let params = req.params || {};
    let boardId = params['boardId'];
    console.log('boardId:', boardId);
    //res.sendFile(path.resolve('views/index.html'));
    res.sendFile(path.resolve('views/board.html'));
});

module.exports = router;