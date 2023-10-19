const db = require('../configs/database')
const escape = require('pg-format')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id_post, user_id, title, description, create_at FROM public.posts ORDER BY id_post DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_post) as count_data from posts;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id_post) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id_post, user_id, title, description, create_at FROM posts WHERE id_post=$1;', [id_post])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getDatabyid = (id_post, user_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT id_post, user_id, title, description, create_at FROM posts WHERE id_post=$1 and user_id=$2;', [id_post, user_id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ user_id, title, description }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into posts (user_id, title, description) values ($1,$2,$3);', [user_id, title, description])
            .then(() => {
                resolve('post data successfully added.')
            }).catch((e) => {
                reject('post data failed to add.')
            })
    })
}

model.updateData = ({ id_post, user_id, title, description }) => {
    return new Promise((resolve, reject) => {
        db.query(`update posts SET user_id=$2, title=$3, description=$4 where id_post = $1;`, [id_post, user_id, title, description])
            .then(() => {
                resolve('post data successfully updated.')
            }).catch(() => {
                reject('post data failed to update.')
            })
    })
}

model.deleteData = ({ id_post, user_id }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from posts where id_post=$1 AND user_id=$2', [id_post, user_id])
            .then(() => {
                resolve('post data successfully deleted.')
            }).catch(() => {
                reject('post data failed to delete.')
            })
    })
}

module.exports = model