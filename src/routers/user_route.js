// import express framework
const express = require('express')
const route = express.Router()
const authCheck = require('../middleware/authCheck')
// import controllers
const control = require('../controllers/user')
const upload_file = require('../middleware/upload_files')

route.get('/', authCheck('admin'), control.getAllData)
route.get('/byid', authCheck('admin', 'user'), control.getData)
route.post('/', authCheck('admin'), control.addData)
route.put('/change_password', authCheck('admin', 'user'), control.change_Password)
route.put('/:id', authCheck('admin', 'user'), upload_file.single('image'), control.updateData)
route.delete('/:id', authCheck('admin'), control.deleteData)

//export
module.exports = route