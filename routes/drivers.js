const express = require('express');
const router = express.Router();
const driversCtrl = require('../controllers/drivers');

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } 
    res.redirect('/auth/google');
}

router.get('/', isLoggedIn, driversCtrl.index);
router.get('/new', isLoggedIn, driversCtrl.new);
router.get('/:driverId', isLoggedIn, driversCtrl.edit);
router.post('/new', isLoggedIn, driversCtrl.create);
router.post('/:driverId', isLoggedIn, driversCtrl.update);
router.delete('/:driverId/truck/:truckId', isLoggedIn, driversCtrl.delete);
router.delete('/:driverId', isLoggedIn, driversCtrl.deleteDriver);






module.exports = router;