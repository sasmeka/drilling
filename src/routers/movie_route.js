// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middleware/authCheck')
// import controllers
const control = require('../controllers/movie')
const upload_file = require('../middleware/upload_files')

route.get('/:value_params', control.getData)
route.get('/', control.getAllData)
route.post('/', authCheck('admin'), upload_file.single('image'), control.addData)
route.put('/:id', authCheck('admin'), upload_file.single('image'), control.updateData)
route.delete('/:id', authCheck('admin'), control.deleteData)

//export
module.exports = route