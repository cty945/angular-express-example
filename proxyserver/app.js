// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var cors = require('cors')
const compression = require("compression");

const app = express();

const isDev = process.env.REACT_APP_BUILD === 'dev';
console.log("Dev?", isDev);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(compression());

// app.use(function(req, res){
//     res.send(404);
// });

//
// if (isDev) {
//   app.use(cors())
// } else {
//   // Create link to Angular build directory
//   // The `ng build` command will save the result
//   // under the `dist` folder.
//   var distDir = __dirname + "/dist/";
//   app.use(express.static(distDir));
// }

const _app_folder = 'dist';



// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, {root: _app_folder});
});

module.exports = app;
