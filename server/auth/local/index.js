'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router.post('/', function(req, res, next) {

  passport.authenticate('local', function (err, user, info) {
	  console.log("user is " + user);
	  //▶  if error
	  var error = err || info;
	  if (error) return res.status(401).json(error);
	  if (!user) return res.status(404).json({message: 'Something went wrong, please try again.'});
	  //」
	  //▶  returns token
	  var token = auth.signToken(user._id, user.role);
	  console.log("token is :" + token);
	  res.json({token: token});
	  //」
  })(req, res, next)
});

module.exports = router;
