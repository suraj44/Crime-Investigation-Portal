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
 * 3 - Scientist
 */




var tree = {};


var officer = {permissions: [['/home', 2], ['/home/create_fir', 0]], children : []}
var detective = {permissions: [['/home/view_fir/:caseid',1 ],['/home/detective/delete_report/:caseid',1],['/home/detective/edit_report/:caseid',2],
['/home/detective/create_report/:caseid',1], ['/home/scientist/create_report/:caseid',1]], children : [officer]}
var scientist = {permissions : [['/home/scientist/delete_report/:caseid',1],['/home/scientist/edit_report/:caseid',2],
['/home/scientist/create_report/:caseid',1]], children : [officer]}
var lieutenant = {permissions : [['/home/detectives_assigned',2],['/home/scientists_assigned',2],
['/home/resolve_case/:caseid',2],['/home/lieutenant/view_forensic_report/:caseid-:scientist_id',2],
['/home/lieutenant/view_detective_report/:caseid-:detective_id',2], ['/home/assign_scientist/:caseID',2],
['/home/view_fir/:caseid',2],['/home/assign_detective/:caseID',2]], children : [detective, scientist]}



function getPermissions(obj, maxPosition) {
    p = []
    for(var i=0; i < obj.permissions.length; i++) {
        if(obj.permissions[i][1] >= maxPosition)
            p.push(obj.permissions[i])
    }
    for(var i=0; i < obj.children.length; i++) {
        p = p.concat(getPermissions(obj.children[i], maxPosition))
    }
    return p
}


var role_permission_dict = {
    0: ['/home','/home/create_fir'],
    1: ['/home','/home/view_fir/:caseid','/home/detective/delete_report/:caseid','/home/detective/edit_report/:caseid',
    '/home/detective/create_report/:caseid', '/home/scientist/create_report/:caseid'],
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
            req.session.role = result[0].role;
                return res.redirect('home')
            }
            
        })
}

exports.loginRequired = function(req,res, next, role, input_url) {
    switch(role){
        case 0: // officer
            p = getPermissions(officer,0);
            for(var i=0 ; i < p.length;i++) {
                if (p[i][0] == input_url) {
                    return next();
                }
            }
            return res.redirect("/authorization_error");
            break;
            case 1: //detective
                p = getPermissions(detective,1);
                for(var i=0 ; i < p.length;i++) {
                    if (p[i][0] == input_url) {
                        return next();
                    }
                }
                return res.redirect("/authorization_error");
                break;
            case 2: //lieutenant
                p = getPermissions(lieutenant,2);
                for(var i=0 ; i < p.length;i++) {
                    if (p[i][0] == input_url) {
                        return next();
                    }
                }
                return res.redirect("/authorization_error");
                break;
            case 3: //scientist
                p = getPermissions(scientist,1);
                for(var i=0 ; i < p.length;i++) {
                    if (p[i][0] == input_url) {
                        return next();
                    }
                }
                return res.redirect("/authorization_error");
                break;
            }

}