var express = require('express');
var router = express.Router();

var ref = new Firebase("https://stylemeapi.firebaseio.com");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'StyleMe' });
});

router.post('/login', function(req, res){

});

router.get('/login', function(req,res){
  res.render('login');
});
function authHandler(err, data){
  if (err){
    console.log(err);
  }
  else{
    console.log('success');
  }
}

module.exports = router;
