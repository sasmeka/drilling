// import express framework
const express = require('express')
const route = express.Router()

// import route config
const user_route = require('./user_route')
const transaction_route = require('./transaction_route')

route.use('/user', user_route)
route.use('/transaction', transaction_route)

// export
module.exports = route