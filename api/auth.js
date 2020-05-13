const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')

const User = require('../models/User')

// @route   POST /api/auth
// @desc    Create new user
// @access  Public
router.post('/', (req, res) => {

    const { email, password } = req.body

    // validation
    if (!email || !password) {
        return res.json({ msg: 'Fileds cannot be empty' })
    }

    // check for user
    User
        .findOne({ email })
        .then(user => {
            if (!user) res.status(400).json({ msg: `User doesn't exists` })

            // validate password
            bcrypt
                .compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Invalid password' })

                    // if password matches, send token and user
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

// @route   GET /api/auth/user
// @desc    get user data
// @access  Private
router.get('/user', auth, (req, res) => {
    User
        .findById(req.user.id)
        .select('-password')
        .then(user => res.json({ user }))
})

module.exports = router