const db = require('../configs/database')
const escape = require('pg-format')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id_user, full_name FROM public.users ORDER BY id_user DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_user) as count_data from users;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

module.exports = model