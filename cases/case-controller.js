const model = require('./case-model');
const login_model = require('../login/login-model');
var path = require('path');
var appDir = path.dirname(require.main.filename);
var fs = require('fs')


exports.createFir = function(req,res){
    complainant = req.body.complainant_name;
    address_1 = req.body.address_1;
    address_2 = req.body.address_2;
    date = req.body.date;
    statement = req.body.statement;
    string_to_write = 'Complainant Name: ' + complainant +'\nAddress: ' + address_1 + ', ' + address_2 + '\nDate: ' + date + '\nRecorded Statement: ' + statement + '\n'
    if (!fs.existsSync(appDir+'/'+req.session.username)){
        fs.mkdirSync(appDir+'/'+req.session.username);
    }
    model.getMaxCaseID(function(result){
        console.log(result);
        max_case_id = result[0].max_case_id;
        if(!max_case_id)
        new_case_id = 1;
        else
        new_case_id = parseInt(max_case_id) + 1;
        var filepath  = appDir + '/' + req.session.username + '/case_' + new_case_id+'.txt'
        console.log(filepath)
        login_model.getOfficerID(req.session.username, function(result){
            officer_id = result[0].officer_id;
            console.log(officer_id);
            model.createCase(filepath,complainant,date,parseInt(officer_id), function(err){
                if(err) throw err;
                fs.writeFile(filepath,string_to_write, function (err) {
                    if (err) throw err;
                    console.log('Saved!');
                  }); 
            })
        })
    }) 
}