const control = {}
const model = require('../models/user_model')
const resp = require('../utils/responses')
const hashing = require('../utils/hashing')

control.getAllData = async (req, res) => {
    try {
        let { page, limit } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllData({ limit, offset })
        if (result.rowCount == 0) throw 'data not found.'
        const result_count_data = await model.getCountData()
        const meta = {
            next: result_count_data.rows[0].count_data <= 0 ? null : page == Math.ceil(result_count_data.rows[0].count_data / limit) ? null : page + 1,
            prev: page == 1 ? null : page - 1,
            last_page: Math.ceil(result_count_data.rows[0].count_data / limit),
            total: result_count_data.rows[0].count_data
        }
        return resp(res, 200, result.rows, meta)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id = req.params.id
        const { fullname, email, role, pass } = req.body
        const pass_hash = await hashing(pass)


        const result_data = await model.getData(id)
        if (result_data.rowCount == 0) throw 'data not found.'

        let result = await model.updateData({ id, email, pass_hash, fullname, role })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}


control.deleteData = async (req, res) => {
    try {
        const id = req.params.id
        const result_data = await model.getData(id)
        if (result_data.rowCount == 0) throw 'data not found.'
        const result = await model.deleteData({ id })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control