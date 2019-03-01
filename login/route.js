const express = require('express');
var path = require('path');
const controller = require('./login-controller');

var appDir = path.dirname(require.main.filename);

var router = express.Router();
router.get('/', function(req,res) {
    // if condition
    res.redirect('login')
})

router.get('/login', function(req,res) {
    res.render('login')
})

router.post('/login', function(req,res) {
    controller.sign_in(req,res);
})

router.get('/home', function(req,res,next) {
	controller.loginRequired(req,res,next);
	} ,function(req,res) {
    console.log("User's role is : " + req.session.role);
    if(req.session.role == 0)
    res.render('forms')
    else
    res.render('home')
})

router.get("/authorization_error", function(req,res) {
    message = "FORBIDDEN";
    desc = "This page is classified.";
    return res.render((appDir + '/templates/error/admin_error.ejs'), { url: req.url, message: message , desc : desc });
})

router.get("/login_error", function(req,res) {
    message = "Login Error";
    desc = "The username or password you entered did not match with our records.";
    return res.render((appDir + '/templates/error/admin_login_error.ejs'), { url: req.url, message: message , desc : desc });
})

router.get('/logout' ,function(req, res) {
	req.session.destroy();
	res.redirect('/');
})



module.exports = router