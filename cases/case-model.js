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

function reopenCase(caseid,  callback){
    sql.query('UPDATE TABLE cases SET status = 0 where caseid = ?', [caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

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

/*function updateForensicReport(caseid, report, callback) {
    sql.query('UPDATE TABLE cases SET forensic_report = ? where caseid = ?', [report, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}*/


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

/*function updateDetectiveReport(caseid, report ,callback) {
    sql.query('UPDATE TABLE cases SET detective_report = ? where caseid = ?', [report, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}*/

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

function viewCaseOfficials(caseid,callback) {
    sql.query('SELECT a.detective_name as "Detective", b.scientist_name as "Forensic Scientist" from Detective a, Scientist b, Detective_Case_Link c, Scientist_Case_Link d, cases e WHERE a.detective_id = c.detective_id AND b.scientist_id = d.scientist_id AND e.caseid = ?', [caseid], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

function assignDetective(caseid, detective_id,callback) {
    sql.query('INSERT INTO Detective_Case_Link(detective_id, caseid) VALUES(?,?)', [detective_id, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}


function dropDetective(caseid, detective_id,callback) {
    sql.query('DELETE FROM Detective_Case_Link WHERE detective_id = ? AND caseid = ?', [detective_id, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function assignForensicScientist(caseid, scientist_id,callback) {
    sql.query('INSERT INTO Scientist_Case_Link(scientist_id, caseid) VALUES(?,?)', [scientist_id, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function getMaxCaseID(callback) {
    sql.query('SELECT MAX(caseid) as \'max_case_id\' from cases',function(err, results){
        if(err) {
            throw err;
        }
        else
        {
            return callback(results);
        }
    })
}

function getNumberOpenCases(callback) {
    sql.query('select count(*) as "open_case_count" from cases where solved_status = 0', function(err,results){
        if(err)
        {
            throw err;
        }
        else{
            return callback(results);
        }
    })
}

function getCaseReport(caseid, callback) {
    sql.query('select fir from cases where caseid =  ?', [caseid],function(err,results){
        if(err)
        {
            throw err;
        }
        else{
            return callback(results);
        }
    })
}








module.exports.createCase = createCase;
module.exports.resolveCase = resolveCase;
module.exports.addForensicReport = addForensicReport;
//module.exports.updateForensicReport = updateForensicReport;
module.exports.addDetectiveReport = addDetectiveReport;
//module.exports.updateDetectiveReport = updateDetectiveReport;
module.exports.updateFIR = updateFIR;
module.exports.updateOfficer = updateOfficer;
module.exports.reopenCase = reopenCase;
module.exports.viewCaseOfficials = viewCaseOfficials;
module.exports.dropDetective = dropDetective;
module.exports.assignDetective = assignDetective;
module.exports.assignForensicScientist = assignForensicScientist;
module.exports.getMaxCaseID = getMaxCaseID;
module.exports.getNumberOpenCases = getNumberOpenCases;
module.exports.getCaseReport = getCaseReport;
module.exports.getDetectiveReport = getDetectiveReport;
module.exports.getForensicReport = getForensicReport;


