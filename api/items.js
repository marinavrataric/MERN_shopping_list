const express = require('express')
const router = express.Router()

const Item = require('../models/Item')

// @route   GET
// @desc    Get all items
// @access  Public
router.get('/', (req, res) => {
    Item
        .find()
        .sort({ date: -1 })
        .then(item => res.json(item))
        .catch(err => res.json(err))
})

// @route   POST
// @desc    Create new item
// @access  Public
router.post('/', (req, res) => {
    const { name } = req.body

    const newItem = new Item({
        name: name
    })

    newItem
        .save()
        .then(item => res.json(item))
})

// @route   DELETE
// @desc    Delete item
// @access  Public
router.delete('/:id', (req, res) => {
    Item
        .findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({ success_delete: true }))
            .catch(() => res.json({ success_delete: false })))
})

module.exports = router