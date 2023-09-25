const jwt = require('jsonwebtoken')
const genToken = (data) => {
    const payload = {
        data: data
    }

    const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME })
    const refresh_token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY_REFRESH, { expiresIn: process.env.JWT_EXPIRE_TIME_REFRESH })
    return { token, refresh_token }
}

module.exports = genToken