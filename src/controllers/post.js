const control = {}
const model = require('../models/post_model')
const resp = require('../utils/responses')

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

control.addData = async (req, res) => {
    try {
        const user_id = req.data_jwt.id
        const { title, description } = req.body
        const result = await model.addData({ user_id, title, description })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id_post = req.params.id
        const { title, description } = req.body

        const result_data = await model.getData(id_post)
        if (result_data.rowCount == 0) throw 'data not found.'

        const user_id = req.data_jwt.id
        const result_data_by_id = await model.getDatabyid(id_post, user_id)
        if (result_data_by_id.rowCount == 0) return resp(res, 400, 'post data failed to update.')

        let result = await model.updateData({ id_post, user_id, title, description })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}


control.deleteData = async (req, res) => {
    try {
        const id_post = req.params.id

        const result_data = await model.getData(id_post)
        if (result_data.rowCount == 0) throw 'data not found.'

        const user_id = req.data_jwt.id
        const result_data_by_id = await model.getDatabyid(id_post, user_id)
        if (result_data_by_id.rowCount == 0) return resp(res, 400, 'post data failed to delete.')

        const result = await model.deleteData({ id_post, user_id })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control