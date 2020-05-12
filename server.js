const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

// MongoDB config
const db = require('./config/keys').mongoURI
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

const PORT = 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))