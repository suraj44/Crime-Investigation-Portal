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
    sql.query('UPDATE Detective_Case_Link SET detective_report = ? where caseid = ? AND detective_id = ?', [report, caseid, detective_id], function (err) {
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
    sql.query('SELECT caseid, detective_report from Detective_Case_Link where  detective_id = ?', [detective_id], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

function deleteDetectiveCase(detective_id, caseid, callback) {
    sql.query('update Detective_Case_Link set detective_report = NULL where detective_id = ? and caseid = ? ', [detective_id,caseid], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback();
        }   
    })
}

function getListDetectiveReports(callback) {
    sql.query('select a.caseid, a.detective_report, b.detective_name, b.detective_id from Detective_Case_Link a, Detective b where a.detective_report is not null and a.detective_id = b.detective_id', function(err,results){
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