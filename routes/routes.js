var Firebase = require('firebase');

var ref = new Firebase('https://stylemeapi.firebaseio.com');
ref.onAuth(authDataCallback);

module.exports = function (app) {

    app.get('/', function (req, res) {
        var userRef = ref.child('users');
        var auth = userRef.getAuth();

        if(auth){
            res.render('home', {username: auth.password.email})
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
            email: req.body.email
        };

        ref.createUser({
            email: User.email,
            password: User.password
        }, function(err, userData) {
            if (err) {
                console.log(err);
            }
            else {
                ref.authWithPassword({
                    email: User.email,
                    password: User.password
                },
                function (err, authData) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('yay');
                    }
                })
            }
        })
        res.redirect('/');
    });

    // logs user out of site, deleting them from the session, and returns to homepage
    app.get('/logout', function (req, res) {
        ref.unauth();
        res.redirect('/');
    });
};

function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        console.log("User is logged out");
    }
}