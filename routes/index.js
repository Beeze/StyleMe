var express = require('express');
var router = express.Router();

var ref = new Firebase("https://stylemeapi.firebaseio.com");

module.exports = function(app){
  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('home', { title: 'StyleMe' });
  });

};

module.exports = router;
