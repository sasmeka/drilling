// import express framework
const express = require('express')
const route = express.Router()
// import controllers
const control = require('../controllers/transaction')

route.get('/', control.getAllData)
route.post('/', control.addData)

//export
module.exports = route