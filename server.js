// provide utitities for working with file and directory paths
var path = require("path");

// provide a web framework for handling http requests and parsing responses 
var express = require("express");

// allow server to access resources from different a different domain that served
// the webpage
var cors = require('cors');

// store express application in a variable 
var app = express();

// executes the cors middleware function with express
app.use(cors());

// enable cross origin resource sharing on all connections
app.options('*', cors());

// configure express to serve static files at the target directories
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, 'public')));

// configure express to parse on requests with a matching content-type header
app.use(express.json());

// serve application from this port
var PORT = 8080;

// listen for connections and returns an http server object 
app.listen(PORT);