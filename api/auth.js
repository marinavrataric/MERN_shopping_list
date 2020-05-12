const express = require('express')
const router = express.Router()

const Auth = require('../models/Auth')

// @route   POST
// @desc    Create new user
// @access  Public
router.post('/', (req, res) => {

    const { email, password } = req.body

    const newUser = new User({
        email: email,
        password: password
    })

    newUser
        .save()
        .then(user => res.json(user))

    if (!email || !password) {
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