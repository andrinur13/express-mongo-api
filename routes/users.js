var express = require('express');
var router = express.Router();
const usersControllers = require('../controllers/UserControllers');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.status(200).json("berhasil");
});

router.post('/add', usersControllers.addUser);

module.exports = router;
