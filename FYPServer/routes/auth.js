var config = require('../config');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
/* GET users listing. */
// router.get('/', function(req, res) {
// res.send('respond with a resource');
// });
router.post('/', function (req, res) {
    var name = req.body.name;
    var password = req.body.password;

    try {
        console.log('====================================');

        if (name == "123" && password == "234") {
            var token = jwt.sign({ name: name }, config.KEY, { expiresIn: config.TimeOut });
        }
        console.log('====================================');
        res.send(token);
    } catch (error) {
        res.send('error');
    }
})
router.post('/check', function (req, res,next) {


    try {
        var token = req.headers.authorization
        jwt.verify(token,config.KEY,(error,decoded)=>{
            if(error){
                res.send("FK");
            }else{
                res.send(decoded.name);
            }
        });
        res.send(token);
    } catch (error) {
        res.send('error');
    }
})
module.exports = router;
