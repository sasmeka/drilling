const control = {}
const bcrypt = require('bcrypt');
const jwebt = require('jsonwebtoken')
const model = require('../models/user_model')
const resp = require('../library/responses')
const jwt = require('../library/jwt')
const sendMail = require('../library/sendMail')
const hashing = require('../library/hashing');

control.home = async (req, res) => {
    try {
        return resp(res, 200, 'WELCOME ! :)')
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.login = async (req, res) => {
    try {
        const { email, pass } = req.body
        if (email == '' || pass == '') return resp(res, 401, 'please input username & password.')
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount == 0) return resp(res, 401, 'e-mail not registered.')
        const result_pass = result_user.rows[0].pass
        const result_status_verify = result_user.rows[0].status_verification
        if (result_status_verify != 1) return resp(res, 401, 'account not verified.')

        const status = await bcrypt.compare(pass, result_pass)
        if (status == true) {
            const token = jwt({
                "email": email,
                "id_user": result_user.rows[0].id_user,
                "role": result_user.rows[0].role
            })
            const data = {
                "id_user": result_user.rows[0].id_user,
                "first_name": result_user.rows[0].first_name,
                "last_name": result_user.rows[0].last_name,
                "phone": result_user.rows[0].phone,
                "email": email,
                "status_verification": result_user.rows[0].status_verification,
                "role": result_user.rows[0].role
            }
            let optionCookie = {
                httpOnly: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000
            }
            optionCookie = process.env.BASE_URL.split('://')[0] == 'https' ? { ...optionCookie, secure: true } : optionCookie
            res.cookie('jwt', token.refresh_token, optionCookie)
            return resp(res, 200, { "message": 'login success.', "Token": token.token, "Refresh_Token": token.refresh_token })
        } else {
            return resp(res, 401, 'wrong password')
        }
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.refresh = async (req, res) => {
    try {
        if (req.cookies?.jwt) {
            const refreshToken = req.cookies.jwt;
            jwebt.verify(refreshToken, process.env.JWT_PRIVATE_KEY_REFRESH,
                (err, decode) => {
                    if (err) {
                        return resp(res, 401, err.message)
                    }
                    else {
                        const accessToken = jwebt.sign({
                            data: {
                                "email": decode.data.email,
                                "id_user": decode.data.id_user,
                                "role": decode.data.role
                            }
                        }, process.env.JWT_PRIVATE_KEY, {
                            expiresIn: process.env.JWT_EXPIRE_TIME_REFRESH
                        });
                        return resp(res, 200, { "message": 'refresh token success.', "Token": accessToken })
                    }
                })
        } else {
            return resp(res, 401, 'refresh token not valid')
        }
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.register = async (req, res) => {
    try {
        const { first_name, last_name, phone, email, pass } = req.body
        const pass_hash = await hashing(pass)

        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount > 0) return resp(res, 401, 'e-mail has been registered.')

        const result = await model.addData({ first_name, last_name, phone, email, pass_hash })

        //send verification mail
        const token_verification = jwt(email).token
        const subject_mail = 'Tickitz Verification'
        const text_mail = process.env.front_url + `/verification?token=${token_verification}`
        sendMail(email, subject_mail, text_mail)

        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.verification = async (req, res) => {
    try {
        const tokens = req.query.token
        let email = ''
        jwebt.verify(tokens, process.env.JWT_PRIVATE_KEY,
            (err, decode) => {
                if (err) {
                    throw err.message
                }
                email = decode.data
            })
        const result_user = await model.getDatabyEmail(email)
        if (result_user.rowCount == 0) return resp(res, 401, 'e-mail not registered.')
        const result_email = result_user.rows[0].email
        const result_id = result_user.rows[0].id_user
        const result = await model.verification({ result_id, result_email })
        return resp(res, 200, result)
    } catch (e) {
        // console.log(e)
        return resp(res, 401, e)
    }
}

module.exports = control