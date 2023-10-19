// import express framework
const express = require('express')
const app = express()
const path = require('path');

// import config dotenv
require('dotenv').config()
// import cors
const cors = require('cors')
app.use(cors());

// import database config
const db = require('./src/configs/database')

// import route
const route = require('./src/routers/routes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(route)
const dir = path.join(__dirname, '/');
console.log(dir)
app.use(express.static(dir));

db.connect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('app running on port ' + process.env.PORT)
    })
}).catch((e) => {
    console.log(e)
})

