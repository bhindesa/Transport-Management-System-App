const express = require('express');
const router = express.Router();
const homeCtrl = require('../controllers/home');

// Insert this middleware for routes that require a logged in user
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    } 
    res.redirect('/auth/google');
}

router.get('/', homeCtrl.index);
router.get('/home', homeCtrl.index);


module.exports = router;
