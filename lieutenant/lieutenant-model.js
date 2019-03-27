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


function assignDetective(caseid, detective_id,callback) {
    sql.query('INSERT INTO Detective_Case_Link(userid, caseid) VALUES(?,?)', [detective_id, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function dropDetective(caseid, detective_id,callback) {
    sql.query('DELETE FROM Detective_Case_Link WHERE userid = ? AND caseid = ?', [detective_id, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function assignForensicScientist(caseid, scientist_id,callback) {
    sql.query('INSERT INTO Scientist_Case_Link(userid, caseid) VALUES(?,?)', [scientist_id, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function dropForensicScientist(caseid, scientist_id,callback) {
    sql.query('DELETE FROM Scientist_Case_Link WHERE userid = ? AND caseid = ?', [scientist_id, caseid], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}

function viewCaseOfficials(caseid,callback) {
    sql.query('SELECT a.detective_name as "Detective", b.scientist_name as "Forensic Scientist" from Detective_Case_Link a, Scientist_Case_Link b, cases c WHERE a.caseid=c.caseid and b.caseid = c.caseid and c.caseid = ?', [caseid], function (err, results) {
        if(err) {
            throw err;
        }
        else {
            return callback(results);
        }   
    })
}

module.exports.assignDetective = assignDetective;
module.exports.dropDetective = dropDetective;
module.exports.assignForensicScientist = assignForensicScientist;
module.exports.dropForensicScientist = dropForensicScientist;
module.exports.viewCaseOfficials = viewCaseOfficials;