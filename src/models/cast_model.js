const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.casts ORDER BY id_cast DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.casts WHERE id_cast=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_cast }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.casts (name_cast) values ($1);', [name_cast])
            .then(() => {
                resolve('cast data successfully added.')
            }).catch(() => {
                reject('cast data failed to add.\'')
            })
    })
}

model.updateData = ({ id_cast, name_cast }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.casts SET name_cast=$2 where id_cast = $1;', [id_cast, name_cast])
            .then(() => {
                resolve('cast data successfully updated.')
            }).catch(() => {
                reject('cast data failed to update.\'')
            })
    })
}

model.deleteData = ({ id_cast }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.casts where id_cast=$1', [id_cast])
            .then(() => {
                resolve('cast data successfully deleted.')
            }).catch(() => {
                reject('cast data failed to delete.')
            })
    })
}
model.deleteDataMovieCastbyCast = ({ id_cast }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie_cast where id_cast=$1', [id_cast])
            .then(() => {
                resolve('cast data successfully deleted.')
            }).catch(() => {
                reject('cast data failed to delete.')
            })
    })
}
model.deleteAllData = async ({ id_cast }) => {
    try {
        const result_data = await model.getData(id_cast)
        if (result_data.rowCount == 0) throw ('data not found.')
        await db.query('BEGIN')
        await model.deleteDataMovieCastbyCast({ id_cast })
        const result = await model.deleteData({ id_cast })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    }
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_cast) as count_data from casts;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

module.exports = model