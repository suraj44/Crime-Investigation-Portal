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

function getOpenCasesInfo(callback) {
    sql.query('select a.caseid, b.officer_name, a.fir from cases a, Officer b where a.solved_status = 0',function(err,results){
        if(err)
        {
            throw err;
        }
        else{
            return callback(results);
        }
    })
}

function getAvailableDetectives(caseid,callback){
    sql.query('select detective_name from Detective where Detective.detective_id NOT IN (select detective_id from Detective_Case_Link where caseid =?)',[caseid],function(err,results){
        if(err) throw err;
        return callback(results);
    })
}

function getAvailableScientists(caseid,callback){
    sql.query('select scientist_name from Scientist where Scientist.scientist_id NOT IN (select scientist_id from Scientist_Case_Link where caseid =?)',[caseid],function(err,results){
        if(err) throw err;
        return callback(results);
    })
}




module.exports.createCase = createCase;
module.exports.resolveCase = resolveCase;
module.exports.updateFIR = updateFIR;
module.exports.updateOfficer = updateOfficer;
module.exports.reopenCase = reopenCase;
module.exports.getMaxCaseID = getMaxCaseID;
module.exports.getNumberOpenCases = getNumberOpenCases;
module.exports.getOpenCasesInfo = getOpenCasesInfo;
module.exports.getAvailableDetectives = getAvailableDetectives;
module.exports.getAvailableScientists = getAvailableScientists;