const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const Item = require('../models/Item')

// @route   GET /api/items/:id
// @desc    Get all items
// @access  Private
router.get('/:id', (req, res) => {
    Item
        .find({ userId: req.params.id })
        .sort({ date: -1 })
        .then(item => res.json(item))
        .catch(err => res.json(err))
})

// @route   POST /api/items
// @desc    Create new item
// @access  Private
router.post('/', auth, (req, res) => {
    const { name, userId } = req.body

    const newItem = new Item({
        name: name,
        userId: userId
    })

    newItem
        .save()
        .then(item => res.json(item))
})

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', auth, (req, res) => {
    Item
        .findById(req.params.id)
        .then(item => item.remove()
            .then(() => res.json({ success_delete: true }))
            .catch(() => res.json({ success_delete: false })))
})

module.exports = router