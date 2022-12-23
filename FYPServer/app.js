
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var MongoClient = require('mongodb').MongoClient;

var auth = require('./routes/auth');
var check = require('./routes/check')
var checktoken = require('./checktoken');

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const mongodb = require('mongodb').MongoClient;
var mongoose = require('mongoose');
const formData = require('express-form-data')

//setting
var morgan = require('morgan');
require('dotenv').config();
var config = require('./config');
var express = require('express');
const bodyParser = require('body-parser');

var cors = require('cors')


var app = express();

app.use(formData.parse())




mongoose.connect("mongodb+srv://CMF:" + process.env.MONGODB_PASS + "@cluster0.vsbu5md.mongodb.net/" + process.env.MONGODB_NAME + "?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, (error) => {

  if (error == null) {
    console.log("Server is connected");
  }
  else {
    console.log(error)
    console.log("Server could not be connected");
  }
});



//allow other device access
app.use(cors())
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT , POST, PATCH, DELETE , GET');
//     return res.status(200).json({});
//   }

//   next();
// })


//error handle
app.use(morgan('dev'));
// app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.set("view engine", "ejs")

//body parser
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
// These must be placed under body parser!!!


// Routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var uploadRouter = require('./routes/uploadFile');
var foodRouter = require('./routes/food');
var shopRouter = require('./routes/shop');
var commentRouter = require('./routes/chat');
const { application } = require('express');


app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/auth', auth);
app.use('/upload', uploadRouter)
app.use('/foods', foodRouter)
app.use('/shops', shopRouter)
app.use('/comment', commentRouter);






mongoose.Promise = global.Promise;







// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// using


// app.use(checktoken);
// app.use('/check', check);



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
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



module.exports = app;




