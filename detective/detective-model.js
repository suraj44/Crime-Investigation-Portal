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
    sql.query('UPDATE TABLE Detective_Case_Link SET detective_report = ? where caseid = ? AND detective_id = ?', [report, caseid, detective_id], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function getDetectiveReport(caseid, detective_id, callback) {
    sql.query('SELECT detective_report from Detective_Case_Link where caseid = ? and detective_id = ?', [caseid, detective_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

function getDetectiveCases(detective_id, callback) {
    sql.query('SELECT caseid from Detective_Case_Link detective_id = ?', [detective_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

module.exports.addDetectiveReport = addDetectiveReport;
module.exports.getDetectiveReport = getDetectiveReport;
module.exports.getDetectiveCases = getDetectiveCases;
