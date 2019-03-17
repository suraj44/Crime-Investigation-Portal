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
    sql.query('UPDATE Scientist_Case_Link SET forensic_report = ? where caseid = ? AND scientist_id = ?', [report, caseid,scientist_id], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function getForensicReport(caseid, scientist_id, callback) {
    sql.query('SELECT forensic_report from Scientist_Case_Link where caseid = ? and scientist_id = ?', [caseid, scientist_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}



function getScientistCases(scientist_id, callback) {
    sql.query('SELECT caseid, forensic_report from Scientist_Case_Link where scientist_id = ?', [scientist_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

function deleteScientistCase(scientist_id, caseid, callback) {
    sql.query('update Scientist_Case_Link set forensic_report = NULL where scientist_id = ? and caseid = ? ', [scientist_id,caseid], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback();
        }   
    })
}

function getListForensicReports(callback) {
    sql.query('select a.caseid, a.forensic_report, b.scientist_name, b.scientist_id from Scientist_Case_Link a, Scientist b where a.forensic_report is not null and a.scientist_id = b.scientist_id', function(err,results){
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
