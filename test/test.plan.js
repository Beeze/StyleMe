var should = require("should"),
    mongoose = require("mongoose"),
    User = require('../models/user'),
    Plan = require('../models/plan'),
    db;

describe('Plan', function() {

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
            if (error) console.log('error: ' + error._message);
            else console.log('success');
        });

        var plan = new Plan({
            title: 'title',
            amountSaving: '1000',
            user_id: user._id
        });

        plan.save(function (error) {
            if (error) console.log('error: ' + error._message);
            else console.log('success');
            done();
        });
    });

    it('finds a plan by title', function(done){

        Plan.findOne({title: 'title'}, function(err, plan){
            plan.title.should.eql('title');
            console.log("Plan: ", plan.title);
            done();
        });
    });

    afterEach(function(done) {
        User.remove({}, function() {
        });
        Plan.remove({}, function() {
            done();
        });
    });
});