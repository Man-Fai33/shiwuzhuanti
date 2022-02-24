var express = require('express');
var router = express.Router();

/* GET users listing. *///user information 
router.get('/', function (req, res) {
  try {
    const { user_email, user_pwd } = req.params;
    query: "SELECT * FROM x WHERE user_email=? AND user_pwd=?";
    res.send(user_email+' respond with a resource '+user_pwd);
  } catch (error) {

  }


});
router.post('/', function (req, res) {
  res.send('respond with a resource edit');
});
router.delete('/:id', function (req, res) {
  res.send('respond with a resource delete');
});
router.put('/:id', function (req, res) {
  res.send('respond with a resource update');
});





router.get('/book', function (req, res) {
  res.send('????????????');
});
router.get('/book/id/:id', function (req, res) { })
router.post('/book', function (req, res) {
  res.send("????");
})


module.exports = router;
