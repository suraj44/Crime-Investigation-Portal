const model = require('./case-model');
const login_model = require('../login/login-model');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var fs = require('fs')


exports.createFir = function(req){
    complainant = req.body.complainant_name;
    address_1 = req.body.address_1;
    address_2 = req.body.address_2;
    date = req.body.date;
    statement = req.body.statement;
    string_to_write = 'Complainant Name: ' + complainant +'\nAddress: ' + address_1 + ', ' + address_2 + '\nDate: ' + date + '\nRecorded Statement: ' + statement + '\n'
    if (!fs.existsSync(appDir+'/'+req.session.username)){
        fs.mkdirSync(appDir+'/'+req.session.username);
    }
    model.getMaxCaseID(function(result){
        console.log(result);
        max_case_id = result[0].max_case_id;
        if(!max_case_id)
        new_case_id = 1;
        else
        new_case_id = parseInt(max_case_id) + 1;
        var filepath  = appDir + '/' + req.session.username + '/case_' + new_case_id+'.txt'
        console.log(filepath)
        login_model.getOfficerID(req.session.username, function(result){
            officer_id = result[0].officer_id;
            console.log(officer_id);
            model.createCase(filepath,complainant,date,parseInt(officer_id), function(err){
                if(err) throw err;
                fs.writeFile(filepath,string_to_write, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  }); 
            })
        })
    }) 
}

exports.createDetectiveReport = function(req){
    caseid = req.session.caseid;
    report = req.body.report;
    string_to_write = report;
    if (!fs.existsSync(appDir+'/'+req.session.username)){
        fs.mkdirSync(appDir+'/'+req.session.username);
    }

    var filepath  = appDir + '/' + req.session.username + '/case_' + caseid +'.txt'
    console.log(filepath)
    login_model.getDetectiveID(req.session.username, function(result){
        detective_id = result[0].detective_id;
        console.log(detective_id);
        model.addDetectiveReport(caseid,parseInt(detective_id), filepath, function(err){
            if(err) throw err;
            fs.writeFile(filepath,string_to_write, function (err) {
                if (err) throw err;
                console.log('Saved!');
                }); 
        })
    })
    
}

exports.createForensicReport = function(req){
    caseid = req.body.caseid;
    report = req.body.report;
    string_to_write = report;
    if (!fs.existsSync(appDir+'/'+req.session.username)){
        fs.mkdirSync(appDir+'/'+req.session.username);
    }

    var filepath  = appDir + '/' + req.session.username + '/case_' + caseid +'.txt'
    console.log(filepath)
    login_model.getScientistID(req.session.username, function(result){
        scientist_id = result[0].scientist_id;
        console.log(detective_id);
        model.addForensicReport(caseid,parseInt(scientist_id), filepath, function(err){
            if(err) throw err;
            fs.writeFile(filepath,string_to_write, function (err) {
                if (err) throw err;
                console.log('Saved!');
                }); 
        })
    })
    
}



exports.readFir = function(caseid) {
    model.getCaseReport(caseid,function(result) {
        pathToReport = result[0].fir;

        fs.readFile(pathToReport, function(err,data){
            if (!err) {
                console.log('received data: ' + data);
            } else {
                console.log(err);
            }
        });

    })
}
exports.readDetectiveReport = function(caseid,detective_id) {
    model.getDetectiveReport(caseid, detective_id, function(result) {
        pathToReport = result[0].detective_report;

        fs.readFile(pathToReport, function(err,data){
            if (!err) {
                console.log('received data: ' + data);
            } else {
                console.log(err);
            }
        });

    })
}
exports.readForensicReport = function(caseid,scientist_id) {
    model.getForensicReport(caseid, scientist_id, function(result) {
        pathToReport = result[0].forensic_report;

        fs.readFile(pathToReport, function(err,data){
            if (!err) {
                console.log('received data: ' + data);
            } else {
                console.log(err);
            }
        });

    })
}

exports.openCaseCount = function(req,res) {
    model.getNumberOpenCases(function(result){
        return result[0].open_case_count;
    })
}