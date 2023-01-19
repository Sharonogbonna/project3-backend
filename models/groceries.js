const mongoose = require('mongoose')

const groceriesSchema = new mongoose.Schema({
   item: {type: String, required: true}, 
   brand: String, 
   store: String,
   unit: String,
   quantity: Number,
   isPurchased: Boolean
 })
 
 const groceries = mongoose.model('Groceries', groceriesSchema)
 
 module.exports = groceries