var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../models/users.js');
var request = require('request');
var Student = require('../models/students');
var Course = require('../models/course');
var registration_mail = require('../mailer');
var normal_mail = require('../normal_mailer');
var contact_mail = require('../contact_mailer');
var Promise = require('promise');
var async = require("async");

passport.use(new Strategy(
    function (username, password, cb) {
        db.findByUsername(username, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                return cb(null, false);
            }
            if (user.password != password) {
                return cb(null, false);
            }
            return cb(null, user);
        });
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    db.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

module.exports = function (app) {
   // app.use(require('morgan')('combined'));
    app.use(require('cookie-parser')());
    app.use(require('body-parser').urlencoded({extended: true}));
    app.use(require('express-session')({secret: 'keyboard cat', resave: false, saveUninitialized: false}));

    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/',function(req,res){
        res.render('home');
    }) 

    app.get('/contact',function(req,res){
        res.render('contact');
    })

    app.post('/contact',function(req,res){
        var name = req.body.name;
        var email = req.body.email;
        var phone = req.body.number;
        var message = req.body.message;
        contact_mail(name,email,phone,message);
        res.redirect('/');
    })

    app.get('/about',function(req,res){
        res.render('about');
    })

    app.get('/help',function(req,res){
        res.render('help');
    })

    app.get('/admin', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
        res.render('admin-home');
    })
    
    app.get('/register',function(req,res){
        res.render('register');
    })

    app.post('/register',function(req,res){
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var email = req.body.email;
        var phone = req.body.phone;
        var whatsappNo = req.body.whatsappNo;
        var courseAlias = req.body.courseAlias;

        var newStudent = new Student({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            whatsappNo: whatsappNo,
            courseAlias: courseAlias
        });

        Student.create(newStudent,function(err,student){
            if(err)
            {
                console.log('Errors are present');
                res.redirect('/register');
            }
            else
            {
                console.log(student);
                registration_mail(student.email, student.firstName);
                res.redirect('/');
            }
        })
    })

    app.get('/addcourse', require('connect-ensure-login').ensureLoggedIn(), function (req, res) {
        res.render('add-course');
    })

    app.post('/addcourse',function(req,res){
        var alias = req.body.alias;
        var name = req.body.name;
        var courseCurriculum = req.body.courseCurriculum;
        var description = req.body.description;
        var fees = req.body.fees;
        var maxsessions = req.body.maxsessions;
        var minsessions = req.body.minsessions;
        var seats = req.body.seats;
        var startDate = req.body.startDate;
        var endDate = req.body.endDate;

        var newCourse = new Course({
            alias: alias,
            name: name,
            courseCurriculum: courseCurriculum,
            description: description,
            fees: fees,
            maxsessions: maxsessions,
            minsessions: minsessions,
            seats: seats,
            startDate: startDate,
            endDate: endDate
        });

        Course.create(newCourse,function(err,course){
            if(err)
            {
                console.log('Errors are present');
                res.redirect('/addcourse');
            }
            else
            {
                console.log(course);
                res.redirect('/admin');
            }
        })
    })

    app.get('/mail', require('connect-ensure-login').ensureLoggedIn(), function(req,res){
        res.render('mail');
    })

    app.post('/mail',function(req,res){
        var alias = req.body.alias;
        var subject = req.body.subject;
        var message = req.body.message;

        var students = Student.find( {courseAlias: alias}, function(err,result){
        if(err)
        {
            console.log("Something went wrong");
            res.redirect('/mail');
        }
        else
        {
            var i = 0;
            async.each(result,function(item){
            normal_mail(item.email, item.firstName, subject, message);
                i++;
            },function(err){
                console.log("hello");
              res.redirect('/admin');
            });
            if(i == result.length)
               res.redirect('/admin'); 
        }
    });

    });

    app.get('/login',
        function (req, res) {
            res.render('login');
        });

    app.post('/login',
        passport.authenticate('local', {failureRedirect: '/'}),
        function (req, res) {
            res.redirect('/admin');
        });

    app.get('/logout',
        function (req, res) {
            req.logout();
            res.redirect('/');
        });

}