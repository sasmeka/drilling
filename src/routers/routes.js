// import express framework
const express = require('express')
const route = express.Router()

// import route config
const movie_route = require('./movie_route')
const director_route = require('./director_route')
const genre_route = require('./genre_route')
const cast_route = require('./cast_route')
const premier_route = require('./premier_route')
const province_route = require('./province_route')
const regency_route = require('./regency_route')
const subdistrict_route = require('./subdistrict_route')
const village_route = require('./village_route')
const location_route = require('./location_route')
const schedule_route = require('./schedule_route')
const booking_route = require('./booking_route')
const user_route = require('./user_route')
const auth_route = require('./auth_route')

route.use('/', auth_route)
route.use('/movie', movie_route)
route.use('/director', director_route)
route.use('/genre', genre_route)
route.use('/cast', cast_route)
route.use('/premier', premier_route)
route.use('/province', province_route)
route.use('/regency', regency_route)
route.use('/subdistrict', subdistrict_route)
route.use('/village', village_route)
route.use('/location', location_route)
route.use('/schedule', schedule_route)
route.use('/booking', booking_route)
route.use('/user', user_route)

// export
module.exports = route