const express = require('express')
const router = express.Router()
const Groceries = require('../models/groceries')

// Index
router.get('/', (req, res) => {
    Groceries.find({}, (err, foundGrocery) => {
        res.json(foundGrocery)
    })
})

// New - Will be handled by React Grocery
// Delete
router.delete('/:id', (req, res)=>{
    Groceries.findByIdAndRemove(req.params.id, (err, deletedGrocery)=>{
        res.json(deletedGrocery);
    });
});
// Update
router.put('/:id', (req, res)=>{
    Groceries.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedGrocery)=>{
        res.json(updatedGrocery);
    });
});
// Create
router.post('/', (req, res)=>{
    Groceries.create(req.body, (err, createdGrocery)=>{
        res.json(createdGrocery); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React Grocery
// Show
router.get('/:id', (req, res)=>{
    Groceries.findById(req.params.id, (err, foundGrocery)=>{
        res.json(foundGrocery);
    });
});


module.exports = router;