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
    sql.query('UPDATE TABLE Scientist_Case_Link SET forensic_report = ? where caseid = ? AND scientist_id = ?', [report, caseid,scientist_id], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function getForensicReport(caseid, scientist_id, callback) {
    sql.query('SELECT forensic_report from Detective_Case_Link where caseid = ? and scientist_id = ?', [caseid, scientist_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

function getScientistCases(scientist_id, callback) {
    sql.query('SELECT caseid from Scientist_Case_Link scientist_id = ?', [scientist_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

module.exports.addForensicReport = addForensicReport;
module.exports.getForensicReport = getForensicReport;
module.exports.getScientistCases = getScientistCases;
