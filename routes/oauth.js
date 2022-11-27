var express = require('express');
var router = express.Router();
const passport = require('passport');

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
 
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/home',
    failureRedirect : '/abc'
  }
));

// OAuth logout route
router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err){
      return next(err);
    }
    res.redirect('/home');
  });
});


module.exports = router;
