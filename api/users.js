const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// @route   POST /api/users
// @desc    Create new user
// @access  Public
router.post('/', (req, res) => {

    const { name, email, password } = req.body

    // validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Fileds cannot be empty' })
    }

    // check for existing user
    User
        .findOne({ email })
        .then(user => {
            if (user) res.status(400).json({ msg: `Email ${email} is already used` })

            const newUser = new User({
                name: name,
                email: email,
                password: password
            })

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash

                    newUser
                        .save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err

                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
})

module.exports = router