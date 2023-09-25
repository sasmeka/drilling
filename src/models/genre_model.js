const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.genre ORDER BY id_genre DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_genre) as count_data from genre;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.genre WHERE id_genre=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_genre }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.genre (name_genre) values ($1);', [name_genre])
            .then(() => {
                resolve('genre data successfully added.')
            }).catch(() => {
                reject('genre data failed to add.\'')
            })
    })
}

model.updateData = ({ id_genre, name_genre }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.genre SET name_genre=$2 where id_genre = $1;', [id_genre, name_genre])
            .then(() => {
                resolve('genre data successfully updated.')
            }).catch(() => {
                reject('genre data failed to update.\'')
            })
    })
}

model.deleteData = ({ id_genre }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.genre where id_genre=$1', [id_genre])
            .then(() => {
                resolve('genre data successfully deleted.')
            }).catch(() => {
                reject('genre data failed to delete.\'')
            })
    })
}

model.deleteDataMovieGenrebyGenre = ({ id_genre }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie_genre where id_genre=$1', [id_genre])
            .then(() => {
                resolve('genre data successfully deleted.')
            }).catch(() => {
                reject('genre data failed to delete.\'')
            })
    })
}

model.deleteAllData = async ({ id_genre }) => {
    try {
        const result_data = await model.getData(id_genre)
        if (result_data.rowCount == 0) throw ('data not found.')
        await db.query('BEGIN')
        await model.deleteDataMovieGenrebyGenre({ id_genre })
        const result = await model.deleteData({ id_genre })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    }
}

module.exports = model