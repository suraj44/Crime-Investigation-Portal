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


function createCase(report, eye_witness, , callback){
    sql.query('INSERT INTO criteria values(?,?,?,?,?,?,?,?)', [week_no, driverID,race_finish, qualifying_finish, no_overtakes, beat_teammate_race, beat_teammate_qualifying, week_score], function (err) {
        if(err) {
            throw err;
        }
        return callback(err);
    })
}