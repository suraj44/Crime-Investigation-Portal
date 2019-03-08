const model = require('./login-model');
var path = require('path');
const sha1 = require('sha1');

const _ = require('underscore')

/**
 * Roles
 * 0 - Officer
 * 1 - Detective
 * 2 - Lieutenant
 */


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
                    console.log("detective")
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

exports.loginRequired = function(req,res, next) {
    if(req.session.username) {
        next();
    } else {
        return res.redirect("authorization_error");
    }
}