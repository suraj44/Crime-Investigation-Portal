const express = require('express');
var path = require('path');
const controller = require('./login-controller');
const case_controller = require('../cases/case-controller')
const case_model = require('../cases/case-model')
var appDir = path.dirname(require.main.filename);

var router = express.Router();
router.get('/', function(req,res) {
    // if condition
    res.redirect('login')
})

router.get('/login', function(req,res) {
    res.render('login')
})

router.get('/test_case', function(req,res) {
    case_controller.readFir(2);
})

router.post('/login', function(req,res) {
    controller.sign_in(req,res);
})

router.get('/home', function(req,res,next) {
	controller.loginRequired(req,res,next);
	} ,function(req,res) {
    console.log("User's role is : " + req.session.role);
    if(req.session.role == 0)
    res.render('officer',{username: req.session.username })
    else if(req.session.role==2)
    {
        case_model.getNumberOpenCases(function(result){
            open_case_count = result[0].open_case_count;
            case_model.getNumberClosedCases(function(result){
                closed_case_count = result[0].closed_case_count;
                case_model.getOpenCasesInfo(function(result){
                res.render('lieutenant',{username: req.session.username, open_case_count:open_case_count,closed_case_count:closed_case_count, allCases: result })
            })
        })  
    })
    }
    else{
        res.render('officer',{username:req.session.username})
    }
})


router.get('/home/assign_detective/:caseID',function(req,res){
    caseid = req.params['caseID']
    case_model.getAvailableDetectives(caseid, function(result){
        console.log(result)
        available_detectives = result;
        res.render('assign_detective',{available_detectives:available_detectives,username:req.session.username,caseid:caseid})
    })
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

router.post('/home/create_fir', function(req,res) {
    case_controller.createFir(req);
    console.log(req.session.username)
    res.redirect('/home')
})

module.exports = router