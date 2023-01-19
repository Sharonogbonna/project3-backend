const express = require('express')
const router = express.Router()
const User = require('../models/users')
const { check, validationResult } = require('express-validator');
const LocalStrategy = require("passport-local").Strategy
const path = require('path')
const bcrypt = require('bcryptjs')

//ROUTES
//renders the log-in page
router.get("/", (req, res) => res.render("index", { user: req.user }));
router.get("/sign-up", (req, res) => res.render("sign-up-form"));

const signUpValidate = [
    // Check Username
  check('username', 'Username Must Be an Email Address').isEmail().trim().escape().normalizeEmail(),
  // Check Password
  check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()];
// Process user input.
// router.post("/sign-up", signUpValidate, (req, res, next) => {
//     const errors = validationResult(req)
//     const user = new User({
//       username: req.body.username,
//       password: req.body.password
//     }).save(err => {
//       if (err || !errors.isEmpty()) { 
//         return next(err) && res.status(422).json({ errors: errors.array() }) ;
//       }
//       res.redirect("/user/");
//     });
//     bcrypt.hash("somePassword", 10, (err, hashedPassword) => {
//         if (err){
//             return next(err)
//         }else{
//             res.redirect('/user')
//         }
//         // otherwise, store hashedPassword in DB
//       });
//   });
//   router.get("/log-out", (req, res, next) => {
//     req.logout(function (err) {
//       if (err) {
//         return next(err);
//       }
//       res.redirect("/");
//     });
//   });
// //let them log in
// router.post(
//     "/log-in",
//     passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/"
//     })
//   );
  module.exports = router