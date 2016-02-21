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
                            //console.log('The current weather in ' + userlocale.city + ', ' + userlocale.region + ' is ' + condition.temp + ' degrees.');
                            //res.render('home', {username: auth.password.email, city: userlocale.city, state: userlocale.region, temperature: condition.temp});
                            //res.redirect('/');
                            res.redirect(
                                "/weatherMe/?" +
                                    "city=" + userlocale.city +
                                    "&state=" + userlocale.region +
                                    "&temp="  + condition.temp +
                                    "&skies=" + condition.code
                            );
                        }
                    });
                }
            });
        });
    });

    app.get('/weatherMe/?', function(req, res){
        var city = req.query.city;
        var state = req.query.state;
        var temp = req.query.temp;
        var skies = req.query.skies;

        console.log(skies);
        var weather =  forecast(skies);

        if (weather == "precipitation" || "nippy"){
            if(temp <= '35'){
                //winter clothes (hats, gloves, winter jackets, boots, etc.)
            }
            else if (temp > '35' && temp < '50' ){
                //fall clothes (jeans, hoodies, jogging pants, etc.)
            }
            else {
                //hoodies, jeans and fleeces
            }
        }
        else if(weather == "cloudy"){
            if (temp <= '35'){
                //winter clothes (hats, gloves, winter jackets, boots, etc.)
            }
            else if (temp > '35' && temp < '50'){
                //fall clothes (jeans, hoodies, jogging pants, etc.)
            }
            else {
                //hoodies, jeans and fleeces
            }
        }
        else if(weather == "warm"){
            //tshirts, shorts, flops, tennis shoes
        }
    });
};


function forecast(weatherCode){

    switch(weatherCode){
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '10':
        case '11':
        case '12':
        case '13':
        case '14':
        case '15':
        case '16':
        case '17':
        case '18':
        case '35':
        case '37':
        case '38':
        case '39':
        case '40':
        case '41':
        case '42':
        case '43':
        case '45':
        case '46':
        case '47':
            return("Precipitation");
            break;
        case '19':
        case '20':
        case '21':
        case '22':
        case '23':
        case '24':
        case '25':
            return("nippy");
            break;
        case '26':
        case '27':
        case '28':
        case '29':
        case '30':
            return("cloudy");
            break;
        case '31':
        case '32':
        case '33':
        case '34':
        case '36':
            return("warm");
            break;
        default: return("not available");
    }

}
function authDataCallback(authData) {
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
    } else {
        console.log("User is logged out");
    }
}