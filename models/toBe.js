const mongoose = require('mongoose')

const toBeSchema = new mongoose.Schema({
   title: {type: String, required: true},
   author: String,
   platform: String,
   category: String, 
   recommender: String
 })
 
 const toBe = mongoose.model('To be', toBeSchema)
 
 module.exports = toBe