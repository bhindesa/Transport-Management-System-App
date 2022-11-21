const express = require('express');

const router = express.Router();

const driversCtrl = require('../controllers/drivers');

router.get('/', driversCtrl.index);

module.exports = router;