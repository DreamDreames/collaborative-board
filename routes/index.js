var express = require('express');
var Vue = require('vue');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  });
  //res.render('index', { title: 'Express' });
});

module.exports = router;
