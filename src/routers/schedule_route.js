// import express framework
const express = require('express')
const route = express.Router()
const control = require('../controllers/schedule')
const authCheck = require('../middleware/authCheck')

// import controllers
route.get('/', control.getAllData)
route.get('/:number', authCheck('admin'), control.getData)
route.post('/', authCheck('admin'), control.addData)
route.post('/time', authCheck('admin'), control.addDataTime)
route.put('/:id', authCheck('admin'), control.updateData)
route.put('/time/:id', authCheck('admin'), control.updateDataTime)
route.delete('/:id', authCheck('admin'), control.deleteData)
route.delete('/time/:id', authCheck('admin'), control.deleteDataTime)

//export
module.exports = route