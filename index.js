const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const routes = require('./lib/route.js')
const path = require('path')
const session = require('express-session')

const appDir = path.dirname(require.main.filename)


app.set('views', __dirname + '/templates')
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));
app.use('/',routes);

console.log("The connection is on localhost:3000");
app.listen(3000);