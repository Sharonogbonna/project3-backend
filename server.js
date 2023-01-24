const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const db = mongoose.connection;
//#region //things for authentication
const { check, validationResult } = require('express-validator');
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')
//#endregion

//models
const AppTracker = require("./models/applications");
const Log = require("./models/bookLog");
const Groceries = require("./models/groceries");
const ToBe = require("./models/toBe");
const Todos = require("./models/todos");
const WishList = require("./models/wishlist");
// const User = require("./models/users");

//controllers
const appController = require("./controllers/applications");
const logController = require("./controllers/bookLog");
const groceryController = require("./controllers/groceries");
const toBeController = require("./controllers/toBe");
const todosController = require("./controllers/todos");
const wishlistController = require("./controllers/wishlist");
// const userController = require("./controllers/users");

//seed data
const appData = require("./utilities/appData");
const groceryData = require("./utilities/groceryData");
const logData = require("./utilities/logData");
const toBeData = require("./utilities/toBe");
const todoData = require("./utilities/todoData");
const wishlistData = require("./utilities/wishlistData");

//#region
//environmental variables
const app = express();
const mongoURI = process.env.MONGO_URI;
const port = process.env || 3001;

//views
// app.set("views", __dirname);
// app.set("view engine", "ejs");
//connecting to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true }, () =>
  console.log("MongoDB connection establish")
);

//error / disconnection
db.on("error", (err) => console.log(err.message + "is MongoDB not running???"));
db.on("disconnected", () => console.log("mongo disconnected"));

//middleware
// extended: false - does not allow nested objects in query strings
app.use(express.urlencoded({ extended: false }));
//use .json(), not .urlencoded()
app.use(express.json());
// we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(express.static("public"));
app.use(cors());
app.use(cors({ origin: '*' })) // used to whitelist requests

//#region authenication middleware
// //middleware for authentication
// app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
// //functions for authentication

// //takes username and password and tries to find them in the database if it exists they are able to move one
// passport.use(
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username: username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//       bcrypt.compare(password, user.password, (err, res) => {
//         if (res) {
//           // passwords match! log user in
//           return done(null, user)
//         } else {
//           // passwords do not match!
//           return done(null, false, { message: "Incorrect password" })
//         }
//       })
//       return done(null, user);
//     });
//   })
// );

// //allows user to log in and stay logged in as they move around the app
// //creates a cookie ans stores in the users browser
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.urlencoded({ extended: false }));
//#endregion
//#endregion

//Routes

//#region //trying authentication
// // app.use("/user", userController);
// //gives me access to the current user
// app.use(function(req, res, next) {
//     res.locals.currentUser = req.user;
//     next();
//   });
// app.get("/user", (req, res) => res.render("index", { user: req.user }));
// app.get("/user/sign-up", (req, res) => res.render("sign-up-form"));
// const signUpValidate = [
//     // Check Username
//   check('username', 'Username Must Be an Email Address').isEmail().trim().escape().normalizeEmail(),
//   // Check Password
//   check('password').isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('Password Must Contain a Number').matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()];
// app.post("/user/sign-up", signUpValidate, (req, res, next) => {
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
// app.post(
//   "/log-in",
//   passport.authenticate("local", {
//     successRedirect: "/user",
//     failureRedirect: "/",
//   })
// );
// app.get("/log-out", (req, res, next) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/user");
//   });
// });
//#endregion

//regular routes
app.get('/', (req, res) => {
  res.render('This is the backend home page')
})
app.use("/applications", appController);
app.use("/groceries", groceryController);
app.use("/booklog", logController);
app.use("/tobes", toBeController);
app.use("/todos", todosController);
app.use("/wishlist", wishlistController);

//seed the data base
app.get("/seed", async (req, res) => {
//   await AppTracker.deleteMany({});
//   await AppTracker.insertMany(appData);
  await Log.deleteMany({});
  await Log.insertMany(logData);
//   await Groceries.deleteMany({});
//   await Groceries.insertMany(groceryData);
//   await ToBe.deleteMany({});
//   await ToBe.insertMany(toBeData);
//   await Todos.deleteMany({});
//   await Todos.insertMany(todoData);
//   await WishList.deleteMany({});
//   await WishList.insertMany(wishlistData);
  res.send("done!");
});

app.listen(3001, function () {
  console.log("Listening", port);
});
