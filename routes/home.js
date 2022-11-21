var express = require('express');
var router = express.Router();

const homeCtrl = require('../controllers/home');

/* GET home page. */
router.get('/', homeCtrl.index);
router.get('/home', homeCtrl.index);


module.exports = router;
