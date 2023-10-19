// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middlewares/authCheck')

// import controllers
const control = require('../controllers/post')

route.get('/', control.getAllData)
route.post('/', authCheck(1), control.addData)
route.put('/:id', authCheck(1), control.updateData)
route.delete('/:id', authCheck(1), control.deleteData)

//export
module.exports = route