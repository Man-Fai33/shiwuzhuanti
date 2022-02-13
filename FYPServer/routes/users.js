var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.get('/book', function(req, res) {
 

  res.send('????????????');
});
router.get('/book/id/:id',function(req, res){})
router.post('/book',function(req,res){
  res.send("????");
})
module.exports = router;
