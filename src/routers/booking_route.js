// import express framework
const express = require('express')
const route = express.Router()

const authCheck = require('../middleware/authCheck')
// import controllers
const control = require('../controllers/booking')

route.get('/', authCheck('admin', 'user'), control.getAllData)
route.get('/:number', authCheck('admin', 'user'), control.getData)
route.post('/', authCheck('admin', 'user'), control.addData)
route.put('/:id', authCheck('admin'), control.updateData)
route.delete('/:id', authCheck('admin'), control.deleteData)

//export
module.exports = route