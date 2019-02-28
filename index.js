const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const routes = require('./login/route.js')
const path = require('path')
const session = require('express-session')
const underscore = require('underscore')
const lodash = require('lodash')
const SECRET_KEY = '\xd6\xca\xbb\xa7u\xaa\x8a\xec\xf4\xb4#\xdf'

const appDir = path.dirname(require.main.filename)


app.set('views', __dirname + '/templates')
app.set('view engine', 'ejs')


app.use("/theme", express.static(__dirname + '/templates/theme'));
app.use("/error", express.static(__dirname + '/templates/error'));

app.use(session({secret: SECRET_KEY, resave :false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',routes);

console.log("The connection is on localhost:3000");
app.listen(3000);