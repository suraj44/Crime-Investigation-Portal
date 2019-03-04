const model = require('./case-model');

exports.createFir = function(req,res){
    complainant = req.body.complainant_name;
    address_1 = req.body.address_1;
    address_2 = req.body.address_2;
    date = req.body.date;
    statement = req.body.statement;
    console.log(date)
    console.log(statement)
}