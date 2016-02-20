var express = require('express');
var router = express.Router();

module.exports = function (app) {
    router.get('/login', function(req,res){
        console.log('login');
        res.render('login');
    });
};
