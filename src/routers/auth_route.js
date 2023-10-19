// import express framework
const express = require('express')
const route = express.Router()
// import controllers
const control = require('../controllers/auth')

route.post('/login', control.login)
route.post('/register', control.register)

//export
module.exports = route