var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var auth =require('./routes/auth');
var check =require('./routes/check' )
var checktoken=require('./checktoken');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// using
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/auth',auth );

app.use(checktoken);
app.use('/check',check);

module.exports = app;
