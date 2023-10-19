// import express framework
const express = require('express')
const route = express.Router()

// import route config
const auth_route = require('./auth_route')
const user_route = require('./user_route')
const post_route = require('./post_route')

route.use('/', auth_route)
route.use('/user', user_route)
route.use('/post', post_route)

// export
module.exports = route