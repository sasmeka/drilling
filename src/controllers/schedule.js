const control = {}
const model = require('../models/schedule_model')
const resp = require('../library/responses')

control.getAllData = async (req, res) => {
    try {
        let { page, limit, id_movie, id_regency, pickdate } = req.query
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 100
        id_movie = id_movie ? id_movie : ""
        id_regency = id_regency ? id_regency : ""
        pickdate = pickdate ? pickdate : ""
        let offset = page >= 1 ? 0 + ((page - 1) * limit) : 0
        const result = await model.getAllData({ limit, offset, id_movie, id_regency, pickdate })
        if (result.rowCount == 0) throw 'data not found.'
        const result_count_data = await model.getCountData({ id_movie, id_regency })
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
        const id_schedule = req.params.number
        const result = await model.getData(id_schedule)
        if (result.rowCount == 0) throw 'data not found.'
        return resp(res, 200, result.rows)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.addData = async (req, res) => {
    try {
        const { id_movie, id_location, id_premier, price, date_start, date_end, times } = req.body
        const result = await model.addData({ id_movie, id_location, id_premier, price, date_start, date_end, times })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}
control.addDataTime = async (req, res) => {
    try {
        const { id_schedule, time } = req.body
        const result_data = await model.getData(id_schedule)
        if (result_data.rowCount == 0) throw 'data schedule not found.'
        const result = await model.addDataTime({ id_schedule, time })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}


control.updateData = async (req, res) => {
    try {
        const id_schedule = req.params.id
        const result_data = await model.getData(id_schedule)
        if (result_data.rowCount == 0) throw 'data schedule not found.'
        const { id_movie, id_location, id_premier, price, date_start, date_end } = req.body
        const result = await model.updateData({ id_schedule, id_movie, id_location, id_premier, price, date_start, date_end })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.updateDataTime = async (req, res) => {
    try {
        const id_time_schedule = req.params.id
        const { id_schedule, time } = req.body
        const result_data = await model.getData(id_schedule)
        if (result_data.rowCount == 0) throw 'data schedule not found.'
        const result_data_time = await model.getDataTime(id_time_schedule)
        if (result_data_time.rowCount == 0) throw 'data time schedule not found.'
        const result = await model.updateDataTime({ id_time_schedule, id_schedule, time })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

control.deleteData = async (req, res) => {
    try {
        const id_schedule = req.params.id
        const result = await model.deleteAllData({ id_schedule })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}
control.deleteDataTime = async (req, res) => {
    try {
        const id_time_schedule = req.params.id
        const result = await model.deleteAllDataTime({ id_time_schedule })
        return resp(res, 200, result)
    } catch (e) {
        console.log(e)
        return resp(res, 500, e)
    }
}

module.exports = control
