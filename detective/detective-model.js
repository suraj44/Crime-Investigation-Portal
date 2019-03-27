const mysql = require("mysql")

const sql = mysql.createConnection({
    host: "localhost",
    user: "k1ng", 
    password: "kyrgios",
    database: "crime"
});


sql.connect(function (err) {
    if(err) {
        console.log("Error connecting to Crime database.");
    } else {
        console.log("Connected to Crime database.")
    }
        
});



function addDetectiveReport(caseid, detective_id, report ,callback) {
    sql.query('UPDATE Detective_Case_Link SET detective_report = ? where caseid = ? AND userid = ?', [report, caseid, detective_id], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function getDetectiveReport(caseid, detective_id, callback) {
    sql.query('SELECT detective_report from Detective_Case_Link where caseid = ? and userid = ?', [caseid, detective_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

function getDetectiveCases(detective_id, callback) {
    sql.query('SELECT Detective_Case_Link.caseid, detective_report from Detective_Case_Link,cases where Detective_Case_Link.userid = ? and solved_status =0', [detective_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

function deleteDetectiveCase(detective_id, caseid, callback) {
    sql.query('update Detective_Case_Link set detective_report = NULL where userid = ? and caseid = ? ', [detective_id,caseid], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback();
        }   
    })
}

function getListDetectiveReports(callback) {
    sql.query('select a.caseid, a.detective_report, a.userid from Detective_Case_Link a, cases b where a.detective_report is not null and a.caseid = b.caseid and b.solved_status=0', function(err,results){
        if(err) throw err;
        else{
            return callback(results);
        }
    })
}


module.exports.addDetectiveReport = addDetectiveReport;
module.exports.getDetectiveReport = getDetectiveReport;
module.exports.getDetectiveCases = getDetectiveCases;
module.exports.deleteDetectiveCase =deleteDetectiveCase;
module.exports.getListDetectiveReports = getListDetectiveReports;