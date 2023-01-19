const express = require('express')
const router = express.Router()
const Wishlist = require('../models/wishlist')

// Index
router.get('/', (req, res) => {
    Wishlist.find({}, (err, foundWish) => {
        res.json(foundWish)
    })
})

// New - Will be handled by React Wish
// Delete
router.delete('/:id', (req, res)=>{
    Wishlist.findByIdAndRemove(req.params.id, (err, deletedWish)=>{
        res.json(deletedWish);
    });
});
// Update
router.put('/:id', (req, res)=>{
    Wishlist.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedWish)=>{
        res.json(updatedWish);
    });
});
// Create
router.post('/', (req, res)=>{
    Wishlist.create(req.body, (err, createdWish)=>{
        res.json(createdWish); //.json() will send proper headers in response so client knows it's json coming back
    });
});
// Edit - Will be handled by React Wish
// Show
router.get('/:id', (req, res)=>{
    Wishlist.findById(req.params.id, (err, foundWish)=>{
        res.json(foundWish);
    });
});


module.exports = router;