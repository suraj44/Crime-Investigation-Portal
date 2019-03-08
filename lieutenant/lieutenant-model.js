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

function dropForensicScientist(caseid, scientist_id,callback) {
    sql.query('DELETE FROM Scientist_Case_Link WHERE scientist_id = ? AND caseid = ?', [scientist_id, caseid], function (err) {
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

module.exports.assignDetective = assignDetective;
module.exports.dropDetective = dropDetective;
module.exports.assignForensicScientist = assignForensicScientist;
module.exports.dropForensicScientist = dropForensicScientist;
module.exports.viewCaseOfficials = viewCaseOfficials;