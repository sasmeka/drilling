const control = {}
const model = require('../models/booking_model')
const resp = require('../library/responses')

control.getAllData = async (req, res) => {
    try {
        let { page, limit } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const id_user = req.data_jwt.role == 'user' ? req.data_jwt.id_user : ''
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

control.getData = async (req, res) => {
    try {
        const id_booking = req.params.number
        const result = await model.getData(id_booking)
        if (result.rowCount == 0) throw 'data not found.'
        return resp(res, 200, result.rows)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.addData = async (req, res) => {
    try {
        const { id_time_schedule, seats, selected_date } = req.body
        const id_user = req.data_jwt.id_user
        const result = await model.addData({ id_time_schedule, id_user, seats, selected_date })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.updateData = async (req, res) => {
    try {
        const id_booking = req.params.id
        const { id_time_schedule, id_user, seats, selected_date } = req.body
        const result_data = await model.getData(id_booking)
        if (result_data.rowCount == 0) throw 'data not found.'
        const result = await model.updateData({ id_booking, id_time_schedule, id_user, seats, selected_date })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_booking = req.params.id
        const result_data = await model.getData(id_booking)
        if (result_data.rowCount == 0) throw 'data not found.'
        const result = await model.deleteData({ id_booking })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control