var Firebase = require('firebase');

var ref = new Firebase('https://stylemeapi.firebaseio.com');

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('home', {user : req.user, plan: req.plan || ""});
    });


    //Displays our signup page
    app.get('/signin', function (req, res) {
        res.render('signin', {});
    });

    //Login a user whose already signed
    app.post('/login', function(req, res){

    });

    //Register for the application
    app.post('/register', function(req, res) {
        var userRef = ref.child('users');

        userRef.push({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }, function(err){
            if (err){
                console.log(err);
            }
            else{
                res.render('home', {user: req.body.username});
            }
        });
    });

    // logs user out of site, deleting them from the session, and returns to homepage
    app.get('/logout', function (req, res) {

    });
};