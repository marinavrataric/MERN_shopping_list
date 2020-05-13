const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()
app.use(express.json())

// MongoDB config
const db = config.get('mongoURI')
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

// Routes
app.use('/api/items', require('./api/items'))
app.use('/api/users', require('./api/users'))
app.use('/api/auth', require('./api/auth'))

const PORT = 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))