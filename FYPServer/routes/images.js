var express = require('express');

var router = express.Router();
var fs = require('fs')
var path = require('path')
router.get('/', function (req, res) {
    console.log(req)
    // res.sendFile(__dirname + "/" + req.url);
    // console.log("Request for " + req.url + " received.");
})

module.exports = router;