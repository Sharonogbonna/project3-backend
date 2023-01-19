const express = require('express')
const router = express.Router()
const User = require('../models/users')
const { check, validationResult } = require('express-validator');

router.get("/", (req, res) => res.render("index"));
router.get("/sign-up", (req, res) => res.render("sign-up-form"));

var signUpValidate = [
    // Check Username
  check('username', 'Username Must Be an Email Address').isEmail().trim().escape().normalizeEmail(),
  // Check Password
  check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()];
// Process user input.
router.post("/sign-up", signUpValidate, (req, res, next) => {
    const errors = validationResult(req)
    const user = new User({
      username: req.body.username,
      password: req.body.password
    }).save(err => {
      if (err || !errors.isEmpty()) { 
        return next(err) && res.status(422).json({ errors: errors.array() }) ;
      }
      res.redirect("/user/");
    });
  });

  module.exports = router