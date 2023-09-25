const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT v.id_subdistrict, v.name_village , s.subdistrict FROM public.village v left join (SELECT s.id_subdistrict,json_agg(jsonb_build_object('id_subdistrict',s.id_subdistrict,'name_subdistrict',s.name_subdistrict)) as subdistrict FROM public.subdistrict s group by s.id_subdistrict) as s on s.id_subdistrict = v.id_subdistrict ORDER BY v.id_village DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT v.id_subdistrict, v.name_village , s.subdistrict FROM public.village v left join (SELECT s.id_subdistrict,json_agg(jsonb_build_object('id_subdistrict',s.id_subdistrict,'name_subdistrict',s.name_subdistrict)) as subdistrict FROM public.subdistrict s group by s.id_subdistrict) as s on s.id_subdistrict = v.id_subdistrict WHERE v.id_village=$1;`, [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_village, id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.village (name_village,id_subdistrict) values ($1,$2);', [name_village, id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'village data successfully added.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'village data failed to add.\''
                })
            })
    })
}

model.updateData = ({ id_village, name_village, id_subdistrict }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.village SET name_village=$2,id_subdistrict=$3 where id_village = $1;', [id_village, name_village, id_subdistrict])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'village data successfully updated.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'village data failed to update.\''
                })
            })
    })
}

model.deleteData = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.village where id_village=$1', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'village data failed to delete.\''
                })
            })
    })
}

model.deleteDataBookingbyvillage = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village = $1)));', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'booking by village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'booking by village data failed to delete.\''
                })
            })
    })
}
model.deleteDataTimeSchedulebyvillage = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village = $1));', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'time schedule by village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'time schedule by village data failed to delete.\''
                })
            })
    })
}
model.deleteDataSchedulebyvillage = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_location in (select id_location from public.location where id_village = $1);', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'schedule by village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'schedule by village data failed to delete.\''
                })
            })
    })
}
model.deleteDataLocationbyvillage = ({ id_village }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.location where id_village = $1;', [id_village])
            .then(() => {
                resolve({
                    'code': '200',
                    'status': 'OK',
                    'message': 'location by village data successfully deleted.'
                })
            }).catch(() => {
                reject({
                    'code': '400',
                    'status': 'Bad Request',
                    'message': 'location by village data failed to delete.\''
                })
            })
    })
}

model.deleteAllData = async ({ id_village }) => {
    try {
        const result_data = await model.getData(id_village)
        if (result_data.rowCount == 0) throw ('data not found.')
        await db.query('BEGIN')
        await model.deleteDataBookingbyvillage({ id_village })
        await model.deleteDataTimeSchedulebyvillage({ id_village })
        await model.deleteDataSchedulebyvillage({ id_village })
        await model.deleteDataLocationbyvillage({ id_village })
        const result = await model.deleteData({ id_village })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    }
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_village) as count_data from village;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
module.exports = model