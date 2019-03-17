const express = require('express');
var path = require('path');
const controller = require('./login-controller');
const case_controller = require('../cases/case-controller')
const case_model = require('../cases/case-model')
const det_model = require('../detective/detective-model')
const lieutenant_model = require('../lieutenant/lieutenant-model')
const scientist_model = require('../scientist/scientist-model')
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
	controller.loginRequired(req,res,next,[0,1,2,3]);
	} ,function(req,res) {
    console.log("User's role is : " + req.session.role);
    if(req.session.role == 0)
        res.render('officer',{username: req.session.username })
    else if(req.session.role==1) {
        console.log("ID IS " + req.session.lol);
        det_model.getDetectiveCases(req.session.lol, function(result){
            console.log(result)
            res.render('detective',{username: req.session.username, cases:result })
        })
        
    }
    else if(req.session.role == 2)
    {
        case_model.getNumberOpenCases(function(result){
            open_case_count = result[0].open_case_count;
            case_model.getNumberClosedCases(function(result){
                closed_case_count = result[0].closed_case_count;
                case_model.getOpenCasesInfo(function(result){
                allCases = result;
                det_model.getListDetectiveReports(function(result){
                    allDetectiveReports = result;
                    scientist_model.getListForensicReports(function(result){
                        res.render('lieutenant',{username: req.session.username, open_case_count:open_case_count,closed_case_count:closed_case_count, allCases: allCases, allDetectiveReports: allDetectiveReports, allForensicReports: result })
                    })
                })
            })
        })  
    })
    }
    else if(req.session.role == 3) {
        scientist_model.getScientistCases(req.session.lol, function(result){
            res.render('scientist',{username: req.session.username, cases:result})
        })
        
    }
})


router.get('/home/assign_detective/:caseID', function(req,res,next) {
	controller.loginRequired(req,res,next, [2]);
	} , function(req,res){
    caseid = req.params['caseID']
    case_model.getAvailableDetectives(caseid, function(result){
        console.log(result)
        available_detectives = result;
        res.render('assign_detective',{available_detectives:available_detectives,username:req.session.username,caseid:caseid})
    })
})

router.get('/home/detective/create_report/:caseid', function(req,res,next) {
	controller.loginRequired(req,res,next,[1]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        req.session.caseid = caseid;
        res.render('detective_create_report', {caseid: caseid, currReport : ""})
})

router.post('/home/detective/create_report/:caseid', function(req,res,next) {
	controller.loginRequired(req,res,next,[1]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        case_controller.createDetectiveReport(req);
        req.session.caseid = null;
        res.redirect('/home')
})

router.get('/home/detective/edit_report/:caseid', function(req,res,next) {
	controller.loginRequired(req,res,next,[1]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        req.session.caseid = caseid;
        case_controller.getDetectiveReport(req, function(report) {
            res.render('detective_create_report', { currReport: report})
        });
})

router.get('/home/detective/delete_report/:caseid', function(req,res,next) {
	controller.loginRequired(req,res,next,[1]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        req.session.caseid = caseid;
        det_model.deleteDetectiveCase(req.session.lol, caseid, function() {
            case_controller.deleteDetectiveReport(req)
            req.session.caseid = null;
            res.redirect('/home')
        })
})

router.get('/home/detective/view_fir/:caseid', function(req,res,next) {
	controller.loginRequired(req,res,next,[1]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        req.session.caseid = caseid;
        console.log("VIEW FIR "+ caseid)
        case_controller.readFir(caseid, function(FIR) {
            res.render('detective_view_fir', { FIR: FIR, username: req.session.username})
        });
})

router.get('/home/scientist/create_report/:caseid', function(req,res,next) {
	controller.loginRequired(req,res,next,[3]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        req.session.caseid = caseid;
        res.render('scientist_create_report', {caseid: caseid, currReport : ""})
})

router.post('/home/scientist/create_report/:caseid', function(req,res,next) {
	controller.loginRequired(req,res,next,[3]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        case_controller.createForensicReport(req);
        req.session.caseid = null;
        res.redirect('/home')
})

router.get('/home/scientist/edit_report/:caseid', function(req,res,next) {
	controller.loginRequired(req,res,next,[3]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        req.session.caseid = caseid;
        case_controller.getForensicReport(req, function(report) {
            res.render('scientist_create_report', { currReport: report})
        });
})

router.get('/home/scientist/delete_report/:caseid', function(req,res,next) {
	controller.loginRequired(req,res,next,[3]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        req.session.caseid = caseid;
        scientist_model.deleteScientistCase(req.session.lol, caseid, function() {
            case_controller.deleteForensicReport(req)
            req.session.caseid = null;
            res.redirect('/home')
        })
})

router.get('/home/assign_scientist/:caseID', function(req,res,next) {
	controller.loginRequired(req,res,next,[2]);
	} ,function(req,res){
    caseid = req.params['caseID']
    case_model.getAvailableScientists(caseid, function(result){
        console.log(result)
        available_scientists = result;
        res.render('assign_scientist',{available_scientists:available_scientists,username:req.session.username,caseid:caseid})
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

router.post('/home/create_fir', function(req,res,next) {
	controller.loginRequired(req,res,next,[0]);
	} ,function(req,res) {
    case_controller.createFir(req);
    console.log(req.session.username)
    res.redirect('/home')
})

router.post('/home/detectives_assigned',function(req,res,next) {
	controller.loginRequired(req,res,next,[2]);
	} ,function(req,res){
    console.log(req.body.caseid);
    for(var i = 0; i<req.body.detective_ids.length; i++){
        lieutenant_model.assignDetective(req.body.caseid,req.body.detective_ids[i],function(err){
            if(err) throw err;
        })
    }
})

router.post('/home/scientists_assigned',function(req,res,next) {
	controller.loginRequired(req,res,next[2]);
	} ,function(req,res){
    console.log(req.body.caseid);
    for(var i = 0; i<req.body.scientist_ids.length; i++){
        lieutenant_model.assignForensicScientist(req.body.caseid,req.body.scientist_ids[i],function(err){
            if(err) throw err;
        })
    }
})


router.get('/home/lieutenant/view_detective_report/:caseid-:detective_id', function(req,res,next) {
	controller.loginRequired(req,res,next,[2]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        detective_id = req.params['detective_id'];
        req.session.caseid = caseid;
        console.log("VIEW DETECTIVE REPORT "+ caseid)
        case_controller.readDetectiveReport(caseid,detective_id, function(report) {
            res.render('lieutenant_view_d_report', { report: report, username:req.session.username})
        });
})

router.get('/home/lieutenant/view_forensic_report/:caseid-:scientist_id', function(req,res,next) {
	controller.loginRequired(req,res,next,[2]);
	} ,function(req,res)  {
        caseid = req.params['caseid'];
        scientist_id = req.params['scientist_id'];
        req.session.caseid = caseid;
        console.log("VIEW FORENSIC REPORT "+ caseid)
        case_controller.readForensicReport(caseid,scientist_id, function(report) {
            res.render('lieutenant_view_f_report', { report: report, username:req.session.username})
        });
})


module.exports = router