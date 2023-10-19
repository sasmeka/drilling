const db = require('../configs/database')
const escape = require('pg-format')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id, email, fullname, role, create_at FROM public.users ORDER BY id DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id) as count_data from users;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT email, pass, fullname, role FROM users WHERE id=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getDatabyEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email=$1 limit 1;', [email])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ email, pass_hash, fullname }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into users (email, pass, fullname, role) values ($1,$2,$3,1);', [email, pass_hash, fullname])
            .then(() => {
                resolve('account has been registered.')
            }).catch((e) => {
                reject('user data failed to add.')
            })
    })
}

model.updateData = ({ id, email, pass_hash, fullname, role }) => {
    return new Promise((resolve, reject) => {
        db.query(`update users SET email=$2, pass=$3, fullname=$4, role=$5 where id = $1;`, [id, email, pass_hash, fullname, role])
            .then(() => {
                resolve('user data successfully updated.')
            }).catch(() => {
                reject('user data failed to update.')
            })
    })
}

model.deleteData = ({ id }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from users where id=$1', [id])
            .then(() => {
                resolve('user data successfully deleted.')
            }).catch(() => {
                reject('user data failed to delete.')
            })
    })
}

module.exports = model