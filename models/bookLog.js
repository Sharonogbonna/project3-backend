const mongoose = require('mongoose')

const bookLogSchema = new mongoose.Schema({
   title: { type: String, required: true }, 
   author: {type: String, required: true },
   startDate: Date,
   endDate: Date, 
   rating: Number,
   summary: String, 
   opinion: String, 
   quotes: [String]
 })
 
 const bookLog = mongoose.model('Book Log', bookLogSchema)
 
 module.exports = bookLog