const control = {}
const model = require('../models/user_model')
const resp = require('../utils/responses')
const hashing = require('../utils/hashing')
const jwt = require('../utils/jwt')
const bcrypt = require('bcrypt');

control.login = async (req, res) => {
    try {
        const { email, pass } = req.body
        if (email == '' || pass == '') return resp(res, 401, 'please input username & password.')

        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount == 0) return resp(res, 401, 'e-mail not registered.')

        const result_pass = result_user.rows[0].pass

        const status = await bcrypt.compare(pass, result_pass)

        if (status == true) {
            const token = jwt({
                "email": email,
                "id": result_user.rows[0].id,
                "role": result_user.rows[0].role
            })
            let optionCookie = {
                httpOnly: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000
            }
            optionCookie = process.env.BASE_URL.split('://')[0] == 'https' ? { ...optionCookie, secure: true } : optionCookie
            res.cookie('jwt', token.refresh_token, optionCookie)
            return resp(res, 200, { "message": 'login success.', "Token": token.token })
        } else {
            return resp(res, 401, 'wrong password')
        }
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.register = async (req, res) => {
    try {
        const { email, pass, fullname } = req.body
        const pass_hash = await hashing(pass)

        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount > 0) return resp(res, 401, 'e-mail has been registered.')

        const result = await model.addData({ email, pass_hash, fullname })

        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control