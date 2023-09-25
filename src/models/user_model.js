const db = require('../configs/database')
const escape = require('pg-format')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id_user, first_name, last_name, phone, email, status_verification, "role",image FROM public.users ORDER BY id_user DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id_user, first_name, last_name, phone, email, status_verification, "role",image FROM public.users WHERE id_user=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.newIdData = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT currval(pg_get_serial_sequence(\'public.users\', \'id_user\')) as new_id_user')
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getDatabyEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.users WHERE email=$1 limit 1;', [email])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ first_name, last_name, phone, email, pass_hash }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.users (first_name, last_name, phone, email, pass, status_verification) values ($1,$2,$3,$4,$5,0);', [first_name, last_name, phone, email, pass_hash])
            .then(() => {
                resolve('account has been registered, please verify via email.')
            }).catch((e) => {
                reject('user data failed to add.')
            })
    })
}

model.updateData = ({ id_user, first_name, last_name, phone, email, image, status_verification }) => {
    image = image == "" ? "" : escape(", image=%L", image)
    return new Promise((resolve, reject) => {
        db.query(`update public.users SET first_name=$2, last_name=$3, phone=$4, email=$5, status_verification=$6 ${image} where id_user = $1;`, [id_user, first_name, last_name, phone, email, status_verification])
            .then(() => {
                resolve('user data successfully updated.')
            }).catch(() => {
                reject('user data failed to update.')
            })
    })
}

model.change_Password = ({ id_user, pass }) => {
    return new Promise((resolve, reject) => {
        db.query(`update public.users SET pass=$2 where id_user = $1;`, [id_user, pass])
            .then(() => {
                resolve('change password successfully.')
            }).catch(() => {
                reject('change password failed.')
            })
    })
}

model.verification = ({ result_id, result_email }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.users SET status_verification=1 where id_user = $1 and email=$2;', [result_id, result_email])
            .then(() => {
                resolve('verified account successfully.')
            }).catch(() => {
                reject('verified account failed.')
            })
    })
}

model.deleteData = ({ id_user }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.users where id_user=$1', [id_user])
            .then(() => {
                resolve('user data successfully deleted.')
            }).catch(() => {
                reject('user data failed to delete.')
            })
    })
}

model.deleteDataBookingbyUser = ({ id_user }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_user=$1', [id_user])
            .then(() => {
                resolve('booking by user data successfully deleted.')
            }).catch(() => {
                reject('booking by user data failed to delete.')
            })
    })
}

model.deleteAllData = async ({ id_user }) => {
    try {
        const result_data = await model.getData(id_user)
        if (result_data.rowCount == 0) throw ('data not found.')
        await db.query('BEGIN')
        await model.deleteDataBookingbyUser({ id_user })
        const result = await model.deleteData({ id_user })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    }
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