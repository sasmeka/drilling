const control = {}
const model = require('../models/transaction_model')
const resp = require('../library/responses')

control.getAllData = async (req, res) => {
    try {
        let { page, limit, id_user } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        id_user = id_user ? id_user : ""
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllData({ limit, offset, id_user })
        if (result.rowCount == 0) throw 'data not found.'
        const result_count_data = await model.getCountData(id_user)
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

control.addData = async (req, res) => {
    try {
        const { id_user, total } = req.body
        const result = await model.addData({ id_user, total })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control