const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const db = mongoose.connection

//models
const AppTracker = require('./models/applications')
//controllers
const appController = require('./controllers/applications')
//seed data
const appData = require('./utilities/appData')

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

//Routes
app.use('/application', appController)

//seed the data base
app.get('/seed', async (req, res) => {
    await AppTracker.deleteMany({});
    await AppTracker.insertMany(appData);
    res.send('done!');
  });

app.listen(3001, function() {
    console.log('Listening', port)
  })