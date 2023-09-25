const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`select r.id_regency,r.name_regency,p.province from regency r left join (select p.id_province,json_agg(jsonb_build_object('id_province',p.id_province,'name_province',p.name_province)) as province from province p group by p.id_province) p on r.id_province =p.id_province ORDER BY r.name_regency DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query(`select r.id_regency,r.name_regency,p.province from regency r left join (select p.id_province,json_agg(jsonb_build_object('id_province',p.id_province,'name_province',p.name_province)) as province from province p group by p.id_province) p on r.id_province =p.id_province WHERE r.id_regency=$1;`, [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_regency, id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.regency (name_regency, id_province) values ($1,$2);', [name_regency, id_province])
            .then(() => {
                resolve('regency data successfully added.')
            }).catch(() => {
                reject('regency data failed to add.\'')
            })
    })
}

model.updateData = ({ id_regency, name_regency, id_province }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.regency SET name_regency=$2, id_province=$3 where id_regency = $1;', [id_regency, name_regency, id_province])
            .then(() => {
                resolve('regency data successfully updated.')
            }).catch(() => {
                reject('regency data failed to update.\'')
            })
    })
}

model.deleteData = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.regency where id_regency=$1', [id_regency])
            .then(() => {
                resolve('regency data successfully deleted.')
            }).catch(() => {
                reject('regency data failed to delete.\'')
            })
    })
}

model.deleteDataBookingbyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1)))));', [id_regency])
            .then(() => {
                resolve('booking by regency data successfully deleted.')
            }).catch(() => {
                reject('booking by regency data failed to delete.\'')
            })
    })
}
model.deleteDataTimeSchedulebyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1))));', [id_regency])
            .then(() => {
                resolve('time schedule by regency data successfully deleted.')
            }).catch(() => {
                reject('time schedule by regency data failed to delete.\'')
            })
    })
}
model.deleteDataSchedulebyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_location in (select id_location from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1)));', [id_regency])
            .then(() => {
                resolve('schedule by regency data successfully deleted.')
            }).catch(() => {
                reject('schedule by regency data failed to delete.\'')
            })
    })
}
model.deleteDataLocationbyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.location where id_village in (select id_village from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1));', [id_regency])
            .then(() => {
                resolve('location by regency data successfully deleted.')
            }).catch(() => {
                reject('location by regency data failed to delete.\'')
            })
    })
}
model.deleteDataVillagebyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.village where id_subdistrict in (select id_subdistrict from public.subdistrict where id_regency = $1);', [id_regency])
            .then(() => {
                resolve('village by regency data successfully deleted.')
            }).catch(() => {
                reject('village by regency data failed to delete.\'')
            })
    })
}
model.deleteDataSubdistrictbyregency = ({ id_regency }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.subdistrict where id_regency = $1;', [id_regency])
            .then(() => {
                resolve('subdistrict by regency data successfully deleted.')
            }).catch(() => {
                reject('subdistrict by regency data failed to delete.\'')
            })
    })
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_regency) as count_data from regency;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.deleteAllData = async ({ id_regency }) => {
    try {
        const result_data = await model.getData(id_regency)
        if (result_data.rowCount == 0) throw ('data not found.')
        await db.query('BEGIN')
        await model.deleteDataBookingbyregency({ id_regency })
        await model.deleteDataTimeSchedulebyregency({ id_regency })
        await model.deleteDataSchedulebyregency({ id_regency })
        await model.deleteDataLocationbyregency({ id_regency })
        await model.deleteDataVillagebyregency({ id_regency })
        await model.deleteDataSubdistrictbyregency({ id_regency })
        const result = await model.deleteData({ id_regency })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    }
}

module.exports = model