const express = require('express')
const router = express.Router()
const ToBe = require('../models/toBe')

// Index
router.get('/', (req, res) => {
    ToBe.find({}, (err, foundToBe) => {
        res.json(foundToBe)
    })
})

// New - Will be handled by React ToBe
// Delete
router.delete('/:id', (req, res)=>{
    ToBe.findByIdAndRemove(req.params.id, (err, deletedToBe)=>{
        res.json(deletedToBe);
    });
});
// Update
router.put('/:id', (req, res)=>{
    ToBe.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedToBe)=>{
        res.json(updatedToBe);
    });
});
// Create
router.post('/', (req, res)=>{
    ToBe.create(req.body, (err, createdToBe)=>{
        res.json(createdToBe); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React ToBe
// Show
router.get('/:id', (req, res)=>{
    ToBe.findById(req.params.id, (err, foundToBe)=>{
        res.json(foundToBe);
    });
});


module.exports = router;