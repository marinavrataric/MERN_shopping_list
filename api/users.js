const express = require('express')
const router = express.Router()

const User = require('../models/User')

// @route   POST
// @desc    Create new user
// @access  Public
router.post('/', (req, res) => {

    const { name, email, password } = req.body

    const newUser = new User({
        name: name,
        email: email,
        password: password
    })

    newUser
        .save()
        .then(user => res.json(user))

    if (!name || !email || !password) {
        return res.json({ msg: 'Fileds cannot be empty' })
    }

    User
        .findOne({ email })
        .then(user => {
            if (user) res.json({ msg: `Email ${email} is already used` })
            res.json({ msg: `Successfully registered` })
        })
})

module.exports = router