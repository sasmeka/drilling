const db = require('../configs/database')
const model = {}

model.getAllData = ({ limit, offset }) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM public.director ORDER BY id_director DESC LIMIT $1 OFFSET $2;`, [limit, offset])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.getData = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM public.director WHERE id_director=$1;', [id])
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}

model.addData = ({ name_director }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into public.director (name_director) values ($1);', [name_director])
            .then(() => {
                resolve('director data successfully added.')
            }).catch(() => {
                reject('director data failed to add.\'')
            })
    })
}

model.updateData = ({ id_director, name_director }) => {
    return new Promise((resolve, reject) => {
        db.query('update public.director SET name_director=$2 where id_director = $1;', [id_director, name_director])
            .then(() => {
                resolve('director data successfully updated.')
            }).catch(() => {
                reject('director data failed to update.\'')
            })
    })
}

model.deleteData = ({ id_director }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.director where id_director=$1', [id_director])
            .then(() => {
                resolve('director data successfully deleted.')
            }).catch(() => {
                reject('director data failed to delete.\'')
            })
    })
}

model.deleteDataBookingbydirector = ({ id_director }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.booking where id_time_schedule in (select id_time_schedule from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_movie in (select id_movie from public.movie where id_director=$1)));', [id_director])
            .then(() => {
                resolve('booking by director data successfully deleted.')
            }).catch(() => {
                reject('booking by data failed to delete.\'')
            })
    })
}
model.deleteDataTimeSchedulebydirector = ({ id_director }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.time_schedule ts where id_schedule in (select id_schedule from public.schedule where id_movie in (select id_movie from public.movie where id_director=$1));', [id_director])
            .then(() => {
                resolve('time schedule by director data successfully deleted.')
            }).catch(() => {
                reject('time schedule by director data failed to delete.\'')
            })
    })
}
model.deleteDataSchedulebydirector = ({ id_director }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.schedule where id_movie in (select id_movie from public.movie where id_director=$1);', [id_director])
            .then(() => {
                resolve('schedule by director data successfully deleted.')
            }).catch(() => {
                reject('schedule by director data failed to delete.\'')
            })
    })
}
model.deleteDataMovieCastbydirector = ({ id_director }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie_cast where id_movie in (select id_movie from public.movie where id_director=$1);', [id_director])
            .then(() => {
                resolve('movie cast by director data successfully deleted.')
            }).catch(() => {
                reject('movie cast by director data failed to delete.\'')
            })
    })
}
model.deleteDataMovieGenrebydirector = ({ id_director }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie_genre where id_movie in (select id_movie from public.movie where id_director=$1);', [id_director])
            .then(() => {
                resolve('movie genre by director data successfully deleted.')
            }).catch(() => {
                reject('movie genre by director data failed to delete.\'')
            })
    })
}
model.deleteDataMoviebydirector = ({ id_director }) => {
    return new Promise((resolve, reject) => {
        db.query('delete from public.movie where id_director=$1;', [id_director])
            .then(() => {
                resolve('movie by director data successfully deleted.')
            }).catch((e) => {
                reject('movie by director data failed to delete.\'')
            })
    })
}
model.deleteAllData = async ({ id_director }) => {
    try {
        const result_data = await model.getData(id_director)
        if (result_data.rowCount == 0) throw ('data not found.')
        await db.query('BEGIN')
        await model.deleteDataBookingbydirector({ id_director })
        await model.deleteDataTimeSchedulebydirector({ id_director })
        await model.deleteDataSchedulebydirector({ id_director })
        await model.deleteDataMovieCastbydirector({ id_director })
        await model.deleteDataMovieGenrebydirector({ id_director })
        await model.deleteDataMoviebydirector({ id_director })
        const result = await model.deleteData({ id_director })
        await db.query('COMMIT')
        return result
    } catch (error) {
        await db.query('ROLLBACK')
        throw error
    }
}
model.getCountData = () => {
    return new Promise((resolve, reject) => {
        db.query(`select count(id_director) as count_data from director;`)
            .then((res) => {
                resolve(res)
            }).catch((e) => {
                reject(e)
            })
    })
}


module.exports = model