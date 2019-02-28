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
