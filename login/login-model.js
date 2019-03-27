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
    sql.query('SELECT userid,role from Users where userid = ? AND password = ?',[userid, password] ,function(err, results){
        if (err) {
            throw err;
        }
        //console.log(results);
        return callback(results);
    })
}