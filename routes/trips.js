const express = require('express');
const router = express.Router();
const tripsCtrl = require('../controllers/trips');

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } 
    res.redirect('/auth/google');
}

router.get('/',isLoggedIn, tripsCtrl.index);
router.get('/new',isLoggedIn, tripsCtrl.new);
router.get('/:tripId',isLoggedIn, tripsCtrl.edit);
router.post('/',isLoggedIn, tripsCtrl.create);
router.post('/:tripId',isLoggedIn, tripsCtrl.update);
router.delete('/:tripId/driver/:driverId',isLoggedIn, tripsCtrl.delete);
router.delete('/:tripId/truck/:truckId',isLoggedIn, tripsCtrl.delete);
router.delete('/:tripId/',isLoggedIn, tripsCtrl.deleteTrip);


module.exports = router;