const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT l.id_location,l.building,l.street,v.village FROM public.location l left join (SELECT v.id_village , json_agg(jsonb_build_object('id_village',v.id_village,'name_village',v.name_village)) as village FROM public.village v group by v.id_village) v on v.id_village=l.id_village ORDER BY l.id_location DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT l.id_location,l.building,l.street,v.village FROM public.location l left join (SELECT v.id_village , json_agg(jsonb_build_object('id_village',v.id_village,'name_village',v.name_village)) as village FROM public.village v group by v.id_village) v on v.id_village=l.id_village WHERE l.id_location=$1;`, [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ id_village, street, building }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.location (id_village, street, building) values ($1,$2,$3);', [id_village, street, building])
            .then(() => {
                resolve('location data successfully added.')
            }).catch(() => {
                reject('location data failed to add.\'')
            })
    })
}

model.updateData = ({ id_location, id_village, street, building }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.location SET id_village=$2, street=$3, building=$4 where id_location = $1;', [id_location, id_village, street, building])
            .then(() => {
                resolve('location data successfully updated.')
            }).catch(() => {
                reject('location data failed to update.\'')
            })
    })
}

model.deleteData = ({ id_location }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.location where id_location=$1', [id_location])
            .then(() => {
                resolve('location data successfully deleted.')
            }).catch(() => {
                reject('location data failed to delete.\'')
            })
    })
}

model.deleteDataBookingbylocation = ({ id_location }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location = $1));', [id_location])
            .then(() => {
                resolve('booking by location data successfully deleted.')
            }).catch(() => {
                reject('booking by data failed to delete.\'')
            })
    })
}
model.deleteDataTimeSchedulebylocation = ({ id_location }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location = $1);', [id_location])
            .then(() => {
                resolve('time schedule by location data successfully deleted.')
            }).catch(() => {
                reject('time schedule by location data failed to delete.\'')
            })
    })
}
model.deleteDataSchedulebylocation = ({ id_location }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_location = $1;', [id_location])
            .then(() => {
                resolve('schedule by location data successfully deleted.')
            }).catch(() => {
                reject('schedule by location data failed to delete.\'')
            })
    })
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_location) as count_data from location;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.deleteAllData = async ({ id_location }) => {
    try {
        const result_data = await model.getData(id_location)
        if (result_data.rowCount == 0) throw ('data not found.')
        await db.query('BEGIN')
        await model.deleteDataBookingbylocation({ id_location })
        await model.deleteDataTimeSchedulebylocation({ id_location })
        await model.deleteDataSchedulebylocation({ id_location })
        const result = await model.deleteData({ id_location })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    }
}

module.exports = model