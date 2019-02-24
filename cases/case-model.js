const mysql = require("mysql")

const sql = mysql.createConnection({
    host: "localhost",
    user: "k1ng", 
    password: "kyrgios",
    database: "fantasyone"
});


sql.connect(function (err) {
    if(err) {
        console.log("Error connecting to Crime database.");
    } else {
        console.log("Connected to Crime database.")
    }
        
});


function createCase(fir,eye_witness,reporting_date,officer_id, callback){
    sql.query('INSERT INTO cases(fir,eye_witness, reporting_date, officer_id) values(?,?,?,?)', [fir,eye_witness,reporting_date, officer_id], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function resolveCase(caseid,  callback){
    sql.query('UPDATE TABLE cases SET status = 1 where caseid = ?', [caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function addForensicReport(caseid, report, callback) {
    sql.query('UPDATE TABLE cases SET forensic_report = ? where caseid = ?', [report, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function updateForensicReport(caseid, report, callback) {
    sql.query('UPDATE TABLE cases SET forensic_report = ? where caseid = ?', [report, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}


function addDetectiveReport(caseid, report ,callback) {
    sql.query('UPDATE TABLE cases SET detective_report = ? where caseid = ?', [report, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function updateDetectiveReport(caseid, report ,callback) {
    sql.query('UPDATE TABLE cases SET detective_report = ? where caseid = ?', [report, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function updateFIR(caseid, fir ,callback) {
    sql.query('UPDATE TABLE cases SET fir = ? where caseid = ?', [fir, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function updateOfficer(caseid, officer ,callback) {
    sql.query('UPDATE TABLE cases SET officer_id = ? where caseid = ?', [officer, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}





module.exports.createCase = createCase;
module.exports.resolveCase = resolveCase;
module.exports.addForensicReport = addForensicReport;
module.exports.updateForensicReport = updateForensicReport;
module.exports.addDetectiveReport = addDetectiveReport;
module.exports.updateDetectiveReport = updateDetectiveReport;
module.exports.updateFIR = updateFIR;
module.exports.updateOfficer = updateOfficer;



