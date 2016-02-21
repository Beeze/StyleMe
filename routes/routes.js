var Firebase = require('firebase');
var YQL = require('yql');
var geocoder = require('geocoder');

var ref = new Firebase('https://stylemeapi.firebaseio.com');
ref.onAuth(authDataCallback);

module.exports = function (app) {

    app.get('/', function (req, res) {
        var userRef = ref.child('users');
        var auth = userRef.getAuth();

        if(auth){
            res.render('home', {username: auth.password.email});
        }
        else{
            res.render('home');
        }
    });


    //Displays our signup page
    app.get('/signin', function (req, res) {
        res.render('signin', {});
    });

    //Login a user whose already signed
    app.post('/login', function(req, res){
        userRef = ref.child('users');
        userRef.authWithPassword({
        email: req.body.email,
        password: req.body.password
        });

        res.redirect('/');
    });

    //Register for the application
    app.post('/register', function(req, res) {
        var User = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            zip: req.body.zipInput
        };
        console.log(req.body);

        ref.createUser({
            email: User.email,
            password: User.password

        }, function(err, userData) {
            if (err) {
                console.log(err);
                res.redirect('/signin');
            }
            else {
                locationRef = ref.child('location');
                console.log('swag');
                locationRef.push({
                   email: User.email,
                    zip: User.zip
                });
                res.redirect(307, '/login');
            }
        });
    });

    // logs user out of site, deleting them from the session, and returns to homepage
    app.get('/logout', function (req, res) {
        ref.unauth();
        res.redirect('/');
    });

    app.post('/weatherMe', function(req, res){

        locationRef = ref.child('location');
        var auth = userRef.getAuth();
        email = auth.password.email;

        locationRef.on('value', function(snapshot){
            snapshot.forEach(function(location){
                var value = location.val();
                if(value.email == email) { //We've found a match!
                    zip = value.zip;
                    var query = new YQL('select * from weather.forecast where (location = ' + zip + ')');

                    query.exec(function (err, data) {
                        if(err){
                            res.send(err);
                        }
                        else{
                            var userlocale = data.query.results.channel.location;
                            var condition = data.query.results.channel.item.condition;
                            console.log('The current weather in ' + userlocale.city + ', ' + userlocale.region + ' is ' + condition.temp + ' degrees.');
                            res.render('home', {username: auth.password.email, city: userlocale.city, state: userlocale.region, temperature: condition.temp});
                            //res.redirect('/');
                        }
                    });
                }
            });
        });
    });
};


function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        console.log("User is logged out");
    }
}