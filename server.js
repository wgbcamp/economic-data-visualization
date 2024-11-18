var path = require("path");
var express = require("express");
var cors = require('cors');
var mongoUtil = require('./mongoUtil');
// mongoUtil.connectServer();

var buildDirectory = path.join(__dirname, "build");
var PORT = 8080;
var app = express();

app.use(cors());
app.options('*', cors());

app.use(express.static(buildDirectory));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//routes

app.listen(PORT, () => {
    console.log(`Express server at port: ${PORT}.`);
});
