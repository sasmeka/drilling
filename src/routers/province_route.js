// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middleware/authCheck')

// import controllers
const control = require('../controllers/province')

route.get('/', authCheck('admin'), control.getAllData)
route.get('/:number', authCheck('admin'), control.getData)
route.post('/', authCheck('admin'), control.addData)
route.put('/:id', authCheck('admin'), control.updateData)
route.delete('/:id', authCheck('admin'), control.deleteData)

//export
module.exports = route