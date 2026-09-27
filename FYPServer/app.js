var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var MongoClient = require('mongodb').MongoClient;

// var auth = require('./routes/auth');
// var check = require('./routes/check')
// var checktoken = require('./checktoken');

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
// const formData = require('express-form-data')

//setting
var morgan = require('morgan');
require('dotenv').config();
var config = require('./config');


const bodyParser = require('body-parser');

var cors = require('cors')

// Routers

var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/uploadFile');
var foodRouter = require('./routes/food');
var ShopRouter = require('./routes/shop');
var commentRouter = require('./routes/chat');
var ImageRouter = require('./routes/images');
var MarketRouter = require('./routes/market')
var FeedBackRouter = require('./routes/feedback')
var BulletinRouter = require('./routes/bulletin')
var syncRouter = require('./routes/sync')
var analyticsRouter = require('./routes/analytics')
const { initScheduledSync } = require('./helper/scheduler');
var app = express();

// app.use(formData.parse())

const mongoURI = process.env.MONGODB_URI || 
  (process.env.MONGODB_PASS 
    ? `mongodb+srv://CMF:${process.env.MONGODB_PASS}@cluster0.vsbu5md.mongodb.net/test${process.env.MONGODB_NAME || ''}?retryWrites=true&w=majority`
    : "mongodb://127.0.0.1:27017/fyp");

mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB is connected successfully to " + mongoURI.replace(/\/\/.*@/, '//***@'));
  })
  .catch((error) => {
    console.log(error);
    console.log("Server could not be connected to MongoDB");
  });

//allow other device access
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT , POST, PATCH, DELETE , GET');
    return res.status(200).json({});
  }
  next();
});

const rateLimit = require('express-rate-limit');

// Rate limiter: 1000 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { status: 'error', message: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use(apiLimiter);

//error handle

// app.use('/uploads', express.static('uploads'));
// app.use(express.static('public'));
// app.set("view engine", "ejs")

//body parser
// These must be placed under body parser!!!
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
// app.use('/auth', auth);
app.use('/upload', uploadRouter)
app.use('/foods', foodRouter)
app.use('/shops',ShopRouter)
app.use('/comment', commentRouter)
app.use('/images', ImageRouter);
app.use('/market', MarketRouter)
app.use('/feedback', FeedBackRouter)
app.use('/bulletin', BulletinRouter)
app.use('/sync', syncRouter)
app.use('/analytics', analyticsRouter)

// 初始化 Google Maps 店家與美食定期排程同步
initScheduledSync();

mongoose.Promise = global.Promise;



//error handle 
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  const remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(remoteAddress)
  next(error);
});

//send back error object as json
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



module.exports = app;




