var should = require("should"),
    mongoose = require("mongoose"),
    User = require('../models/user'),
    db;

describe('User', function() {

    before(function(done){
        db = mongoose.connect('mongodb://localhost/test');
        done();
    });

    after(function (done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function(done) {
       var user = new User({
           username: '12345',
           password: 'test',
           email: 'abc@test.com'
       });

       user.save(function (error) {
           if (error) console.log('error' + error._message);
           else console.log('success');
           done();
       });
    });

    it('finds a user by username', function(done){

        User.findOne({ username: '12345' }, function(err, user){
            user.username.should.eql('12345');
            console.log("   username: ", user.username);
            done();
        })
    });

    afterEach(function(done) {
        User.remove({}, function() {
            done();
        });
    });
});