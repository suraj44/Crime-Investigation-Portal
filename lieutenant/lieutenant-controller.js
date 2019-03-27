const model = require('./case-model');
const login_model = require('../login/login-model');
var path = require('path');

exports.addDetectivesToCases = function(req,res) {
    // parse the caseid from request
    caseid = 0;

    // TODO: parse detective IDs from request and store in list

    list = []

    list.forEach(function(listItem, index){
        model.assignDetective(caseid, listItem,function(result) {
            ;
        } ) 
      });
} 

exports.removeDetectivesToCases = function(req,res) {
    // parse the caseid from request
    caseid = 0;

    // TODO: parse detective IDs from request and store in list

    list = []

    list.forEach(function(listItem, index){
        model.dropDetective(casid, listItem,function(result) {
            ;
        } ) 
      });
} 