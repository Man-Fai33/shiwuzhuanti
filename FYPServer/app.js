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
var systemRouter = require('./routes/system');
require('./helper/loggerBuffer'); // 啟用滾動日誌緩衝
const { initAllSchedulers } = require('./helper/scheduler');
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

const compression = require('compression');

//allow other device access
app.use(cors())
app.use(compression());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT , POST, PATCH, DELETE , GET');
    return res.status(200).json({});
  }
  next();
});

// 啟用智慧防爬蟲與惡意請求防禦中介軟體 (Anti-Crawler & Bot Shield)
const { antiCrawlerMiddleware } = require('./helper/antiCrawler');
app.use(antiCrawlerMiddleware);

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


// 動態產生全站 XML Sitemap 供搜尋引擎 Googlebot 檢索
const MarketModel = require('./models/market');
const ShopModel = require('./models/shop');
const FoodModel = require('./models/food');

app.get('/sitemap.xml', async (req, res) => {
  try {
    const markets = await MarketModel.find({}, '_id name').lean();
    const shops = await ShopModel.find({ isSale: true }, '_id shopName shopYeShi').lean();
    const foods = await FoodModel.find({ isSale: true }, '_id foodName').lean();

    const baseUrl = process.env.BASE_URL || 'https://nightmarket.taiwan.travel';
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

    const staticPages = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/nightmarket', priority: '0.9', changefreq: 'daily' },
      { loc: '/foodlist', priority: '0.9', changefreq: 'daily' },
      { loc: '/travelguide', priority: '0.8', changefreq: 'weekly' },
      { loc: '/account', priority: '0.8', changefreq: 'monthly' },
      { loc: '/bulletin', priority: '0.7', changefreq: 'weekly' },
    ];

    staticPages.forEach(p => {
      xml += `  <url>\n    <loc>${baseUrl}${p.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>\n`;
    });

    markets.forEach(m => {
      xml += `  <url>\n    <loc>${baseUrl}/nightmarketpage?id=${m._id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>\n`;
    });

    shops.forEach(s => {
      xml += `  <url>\n    <loc>${baseUrl}/shop?id=${s._id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
    });

    foods.forEach(f => {
      xml += `  <url>\n    <loc>${baseUrl}/foodinfo?id=${f._id}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>\n`;
    });

    xml += `</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error('Failed to generate dynamic sitemap:', err);
    res.status(500).send('Error generating sitemap');
  }
});

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
app.use('/system', systemRouter)

// 初始化全系統自動定期排程 (Google Maps 同步、每日流量歸檔、健康維護)
initAllSchedulers();

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




