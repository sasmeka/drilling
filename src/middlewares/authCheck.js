const resp = require('../utils/responses')
const jwt = require('jsonwebtoken')


const middleware = (...role) => {
    return (req, res, next) => {
        const { authorization } = req.headers

        if (!authorization) {
            return resp(res, 401, 'please login first.')
        }

        const token = authorization.replace('Bearer ', '')
        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decode) => {
            if (err) {
                return resp(res, 401, err.message)
            }
            if (role.includes(decode.data.role) == false) return resp(res, 401, "you don't have access.")
            req.data_jwt = decode.data
            return next()
        })
    }
}

module.exports = middleware