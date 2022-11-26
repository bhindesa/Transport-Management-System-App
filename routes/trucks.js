const express = require('express');

const router = express.Router();

const trucksCtrl = require('../controllers/trucks');

router.get('/', trucksCtrl.index);
router.get('/new', trucksCtrl.new);
router.get('/:truckId', trucksCtrl.edit);
router.post('/', trucksCtrl.create);
router.post('/:truckId', trucksCtrl.update);
router.delete('/:truckId/driver/:driverId', trucksCtrl.deleteDriver);




module.exports = router;
