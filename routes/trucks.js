const express = require('express');
const router = express.Router();
const trucksCtrl = require('../controllers/trucks');

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } 
    res.redirect('/auth/google');
}

router.get('/',isLoggedIn, trucksCtrl.index);
router.get('/new',isLoggedIn, trucksCtrl.new);
router.get('/:truckId',isLoggedIn, trucksCtrl.edit);
router.post('/',isLoggedIn, trucksCtrl.create);
router.post('/:truckId',isLoggedIn, trucksCtrl.update);
router.delete('/:truckId/driver/:driverId',isLoggedIn, trucksCtrl.deleteDriver);
router.delete('/:truckId/',isLoggedIn, trucksCtrl.deleteTruck);





module.exports = router;
