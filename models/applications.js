const mongoose = require('mongoose')

const appTrackerSchema = new mongoose.Schema({
   company: { type: String, required: true },
   position: { type: String, required: true },
   appLink: { type: String, required: true },
   description: String, 
   compensation: String, 
   benefits: Boolean,
   dateApplied: Date, 
   response: Boolean, 
   responseDate: Date, 
   interview: Boolean, 
   interviewDate: Date,
   offer: Number, 
   stillInterested: Boolean,
   location: String
})

const appTrack = mongoose.model('Applications', appTrackerSchema)

module.exports = appTrack