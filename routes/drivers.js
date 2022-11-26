const express = require('express');

const router = express.Router();

const driversCtrl = require('../controllers/drivers');

router.get('/', driversCtrl.index);
router.get('/new', driversCtrl.new);
router.get('/:driverId', driversCtrl.edit);
router.post('/new', driversCtrl.create);
router.post('/:driverId', driversCtrl.update);
router.delete('/:driverId/truck/:truckId', driversCtrl.delete);





module.exports = router;