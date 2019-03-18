const model = require('./login-model');
var path = require('path');
const sha1 = require('sha1');
const regex = require('regex')

const _ = require('underscore')

/**
 * Roles
 * 0 - Officer
 * 1 - Detective
 * 2 - Lieutenant
 */


var role_permission_dict = {
    0: ['/home','/home/create_fir'],
    1: ['/home','/home/view_fir/:caseid','/home/detective/delete_report/:caseid','/home/detective/edit_report/:caseid',
    '/home/detective/create_report/:caseid'],
    2: ['/home','/home/detectives_assigned','/home/scientists_assigned',
        '/home/resolve_case/:caseid','/home/lieutenant/view_forensic_report/:caseid-:scientist_id',
        '/home/lieutenant/view_detective_report/:caseid-:detective_id', '/home/assign_scientist/:caseID',
        '/home/view_fir/:caseid','/home/assign_detective/:caseID'],
    3: ['/home','/home/scientist/delete_report/:caseid','/home/scientist/edit_report/:caseid',
    '/home/scientist/create_report/:caseid']
}

exports.sign_in = function(req,res) {
    username = req.body.username;
    password = req.body.password;
    console.log(username);
    model.doesUserExist(username, password, function(result) {
        if(result.length == 0) {
            res.redirect("login_error")
        } else {
            req.session.username = username;
            req.session.role = null;
            var finished = _.after(4, doRender);
            model.doesOfficerExist(username , function(result) {
                if(result.length != 0) {
                    req.session.role = 0;
                    console.log("officer")
                }
                finished();
            })

            model.doesDetectiveExist(username, function(result) {
                if(result.length != 0) {
                    req.session.role = 1;
                    console.log("LOK HERE " + result[0].detective_id)
                    req.session.lol = result[0].detective_id
                    console.log("detective "+ result[0].detective_id)
                    console.log("detective "+ req.session.lol)
                }
                finished();
            })
            
            model.doesLieutenantExist(username, function(result) {
                if(result.length != 0) {
                    req.session.role = 2;
                    console.log("lieutenant")
                }
                finished();
            })

            model.doesScientistExist(username, function(result) {
                if(result.length != 0) {
                    req.session.role = 3;
                    req.session.lol = result[0].scientist_id
                    console.log("Scientist")
                }
                finished();
            })

            // req.session.role = get his role - detective ,officer etc
            function doRender() {
                console.log("At doRender()")
                if(req.session.role == null) {
                    // even through user was in login table, doesn't exist. flaw. don't allow
                    return res.redirect('login')
                }
                return res.redirect('home')
            }
            
        }
    })
}

exports.loginRequired = function(req,res, next, role, input_url) {
    if(role_permission_dict[role].includes(input_url)) {
        next();
    } else {
        return res.redirect("/authorization_error");
    }
}