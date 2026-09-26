var express = require('express');

var router = express.Router();
var fs = require('fs')
var path = require('path')
router.get('/:filename', function (req, res) {
    const filePath = path.join(__dirname, '../public/images', req.params.filename);
    res.sendFile(filePath);
});
router.get('/', function (req, res) {
    res.status(404).json({ status: "fail", message: "Image filename required" });
});

module.exports = router;