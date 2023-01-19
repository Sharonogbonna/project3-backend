const express = require('express')
const router = express.Router()
const Log = require('../models/bookLog')

// Index
router.get('/', (req, res) => {
    Log.find({}, (err, foundBookLog) => {
        res.json(foundBookLog)
    })
})

// New - Will be handled by React BookLog
// Delete
router.delete('/:id', (req, res)=>{
    Log.findByIdAndRemove(req.params.id, (err, deletedBookLog)=>{
        res.json(deletedBookLog);
    });
});
// Update
router.put('/:id', (req, res)=>{
    Log.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedBookLog)=>{
        res.json(updatedBookLog);
    });
});
// Create
router.post('/', (req, res)=>{
    Log.create(req.body, (err, createdBookLog)=>{
        res.json(createdBookLog); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React BookLog
// Show
router.get('/:id', (req, res)=>{
    Log.findById(req.params.id, (err, foundBookLog)=>{
        res.json(foundBookLog);
    });
});


module.exports = router;