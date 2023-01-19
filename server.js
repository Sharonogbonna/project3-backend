const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const db = mongoose.connection

//models
const AppTracker = require('./models/applications')
const Log = require('./models/bookLog')
const Groceries = require('./models/groceries')
const ToBe = require('./models/toBe')
const Todos = require('./models/todos')
const WishList= require('./models/wishlist')

//controllers
const appController = require('./controllers/applications')
const logController = require('./controllers/bookLog')
const groceryController = require('./controllers/groceries')
const toBeController = require('./controllers/toBe')
const todosController = require('./controllers/todos')
const wishlistController = require('./controllers/wishlist')

//seed data
const appData = require('./utilities/appData')
const groceryData = require('./utilities/groceryData')
const logData = require('./utilities/logData')
const toBeData = require('./utilities/toBe')
const todoData = require('./utilities/todoData')
const wishlistData = require('./utilities/wishlistData')

//#region 
//environmental variables
const app = express()
const mongoURI = process.env.MONGO_URI
const port = process.env || 3001

//connecting to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true}, () => console.log ('MongoDB connection establish'))

//error / disconnection
db.on('error', err => console.log(err.message + 'is MongoDB not running???'))
db.on('disconnected', () => console.log('mongo disconnected'))

//middleware
// extended: false - does not allow nested objects in query strings
app.use(express.urlencoded({ extended: false }))
//use .json(), not .urlencoded()
app.use(express.json()); 
// we need to tell express to use the public directory for static files... this way our app will find index.html as the route of the application! We can then attach React to that file!
app.use(express.static('public')) 
app.use(cors())
//#endregion
//Routes
// app.use('/application', appController)
// app.use('/groceries', groceryController)
// app.use('/booklog', logController)
// app.use('/tobe', toBeController)
// app.use('/todos', todosController)
// app.use('/wishlist', wishlistController)

//seed the data base
app.get('/seed', async (req, res) => {
    await AppTracker.deleteMany({});
    await AppTracker.insertMany(appData);
    await Log.deleteMany({});
    await Log.insertMany(logData);
    await Groceries.deleteMany({});
    await Groceries.insertMany(groceryData);
    await ToBe.deleteMany({});
    await ToBe.insertMany(toBeData);
    await Todos.deleteMany({});
    await Todos.insertMany(todoData);
    await WishList.deleteMany({});
    await WishList.insertMany(wishlistData);
    res.send('done!');
  });

app.listen(3001, function() {
    console.log('Listening', port)
  })