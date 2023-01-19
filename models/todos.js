const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
   title: {type: String, required: true}, 
   description: String,
   complete: Boolean,
   due: Date, 
   created: Date
})

const Todos = mongoose.model('Todo', todoSchema)

module.exports = Todos