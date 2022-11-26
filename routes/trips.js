const express = require('express');
const router = express.Router();

const tripsCtrl = require('../controllers/trips');

router.get('/', tripsCtrl.index);
router.get('/new', tripsCtrl.new);
router.get('/:tripId', tripsCtrl.edit);
router.post('/', tripsCtrl.create);
router.post('/:tripId', tripsCtrl.update);
router.delete('/:tripId/driver/:driverId', tripsCtrl.delete);
router.delete('/:tripId/truck/:truckId', tripsCtrl.delete);


module.exports = router;