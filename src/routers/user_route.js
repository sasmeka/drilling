// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middlewares/authCheck')

// import controllers
const control = require('../controllers/user')

route.get('/', authCheck(0), control.getAllData)
route.put('/:id', authCheck(0), control.updateData)
route.delete('/:id', authCheck(0), control.deleteData)

//export
module.exports = route