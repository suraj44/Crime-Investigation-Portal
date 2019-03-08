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


exports.doesUserExist = function(userid, password, callback) {
    sql.query('SELECT userid from Login where userid = ? AND password = ?',[userid, password] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

exports.doesOfficerExist = function(userid, callback) {
    sql.query('SELECT userid from Officer where userid = ?',[userid] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

exports.doesDetectiveExist = function(userid, callback) {
    sql.query('SELECT userid from Detective where userid = ?',[userid] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}


exports.doesLieutenantExist = function(userid, callback) {
    sql.query('SELECT userid from Lieutenant where userid = ?',[userid] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}

exports.doesScientistExist = function(userid, callback) {
    sql.query('SELECT userid from Scientist where userid = ?',[userid] ,function(err, results){
        if (err) {
            throw err;
        }
        console.log(results);
        return callback(results);
    })
}

exports.getOfficerID = function(userid, callback) {
    sql.query('SELECT officer_id from Officer where userid = ?',[userid], function(err, results){
        if(err) {
            throw err;
        }
        return callback(results);
    })
}

exports.getDetectiveID = function(userid, callback) {
    sql.query('SELECT detective_id from Detective where userid = ?',[userid], function(err, results){
        if(err) {
            throw err;
        }
        return callback(results);
    })
}

exports.getScientistID = function(userid, callback) {
    sql.query('SELECT scientist_id from Scientist where userid = ?',[userid], function(err, results){
        if(err) {
            throw err;
        }
        return callback(results);
    })
}