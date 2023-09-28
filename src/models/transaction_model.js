const db = require('../configs/database')
const escape = require('pg-format')
const model = {}

model.getAllData = ({ limit, offset, id_user }) => {
    return new Promise((resolve, reject) => {
        id_user = id_user == "" ? "" : escape("AND id_user = %L", id_user)
        db.query(`SELECT id_transaction, id_user, total, date FROM public.transactions WHERE TRUE ${id_user} ORDER BY id_transaction DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getCountData = (id_user) => {
    return new Promise((resolve, reject) => {
        id_user = id_user == "" ? "" : escape("AND id_user = %L", id_user)
        db.query(`select count(id_transaction) as count_data from transactions WHERE TRUE ${id_user};`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

// ADD DATA
model.addData = ({ id_user, total }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.transactions (id_user,total) values ($1,$2)', [id_user, total])
            .then(() => {
                resolve('transaction data successfully added.')
            }).catch(() => {
                reject('transaction data failed to add.')
            })
    })
}

module.exports = model