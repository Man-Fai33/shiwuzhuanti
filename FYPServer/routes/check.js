var config = require('../config');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res) {
 
res.json(req.auth);

});

module.exports = router;
