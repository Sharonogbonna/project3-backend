const express = require('express')
const router = express.Router()
const AppTracker = require('../models/applications')

// Index
router.get('/', (req, res) => {
    AppTracker.find({}, (err, foundApplication) => {
        res.json(foundApplication)
    })
})

// New - Will be handled by React application
// Delete
router.delete('/:id', (req, res)=>{
    AppTracker.findByIdAndRemove(req.params.id, (err, deletedApplication)=>{
        res.json(deletedApplication);
    });
});
// Update
router.put('/:id', (req, res)=>{
    AppTracker.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedApplication)=>{
        res.json(updatedApplication);
    });
});
// Create
router.post('/', (req, res)=>{
    AppTracker.create(req.body, (err, createdApplication)=>{
        res.json(createdApplication); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React application
// Show
router.get('/:id', (req, res)=>{
    AppTracker.findById(req.params.id, (err, foundApplication)=>{
        res.json(foundApplication);
    });
});


module.exports = router;