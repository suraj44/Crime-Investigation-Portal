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


function addForensicReport(caseid,scientist_id, report, callback) {
    sql.query('UPDATE Scientist_Case_Link SET forensic_report = ? where caseid = ? AND userid = ?', [report, caseid,scientist_id], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function getForensicReport(caseid, scientist_id, callback) {
    sql.query('SELECT forensic_report from Scientist_Case_Link where caseid = ? and userid = ?', [caseid, scientist_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}



function getScientistCases(scientist_id, callback) {
    sql.query('SELECT Scientist_Case_Link.caseid, forensic_report from Scientist_Case_Link, cases where Scientist_Case_Link.userid = ? and solved_status = 0', [scientist_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

function deleteScientistCase(scientist_id, caseid, callback) {
    sql.query('update Scientist_Case_Link set forensic_report = NULL where userid = ? and caseid = ? ', [scientist_id,caseid], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback();
        }   
    })
}

function getListForensicReports(callback) {
    sql.query('select a.caseid, a.forensic_report, a.userid from Scientist_Case_Link a, cases b where a.forensic_report is not null and b.caseid=a.caseid and b.solved_status=0', function(err,results){
        if(err) throw err;
        else{
            return callback(results);
        }
    })
}

module.exports.addForensicReport = addForensicReport;
module.exports.getForensicReport = getForensicReport;
module.exports.getScientistCases = getScientistCases;
module.exports.deleteScientistCase = deleteScientistCase;
module.exports.getListForensicReports = getListForensicReports;
