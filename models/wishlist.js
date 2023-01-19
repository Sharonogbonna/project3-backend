const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
   name: {type: String, required: true},
   store: String,
   price: Number,
   reason: String,
   link: String
 })
 
 const wishlist = mongoose.model('Wishe', wishlistSchema)
 
 module.exports = wishlist